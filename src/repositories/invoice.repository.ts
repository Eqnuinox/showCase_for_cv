import {Transaction} from "sequelize";
import sequelizeConnection from "../databases/sequelizeConnection";
import {Cart, CartProduct, Invoice, LoyaltyRoles, Product, UserLoyaltyRole} from "../databases/models";
import {CouponRepository, ProductRepository, UserRepository} from "repositories";
import {ErrorService, RedisService} from "../services";


class InvoiceRepository {

    private UserRepository: UserRepository;
    private CouponRepository: CouponRepository;
    private ProductRepository: ProductRepository;
    private RedisService: RedisService;


    constructor() {
        this.UserRepository = new UserRepository();
        this.CouponRepository = new CouponRepository();
        this.ProductRepository = new ProductRepository();
        this.RedisService = new RedisService();
    }

    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    async createInvoice(user_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();

            // Fetch user
            const user = await this.UserRepository.getUserById(user_id);
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            let cart = await Cart.findOne({where: {user_id}});

            // Fetch products in cart
            const products = await this.ProductRepository.getAllProductsInCartByUserId(user_id);
            if (!products || !products.length) {
                throw new ErrorService(404, 'Products in cart not found');
            }

            // Calculate total price
            // @ts-ignore
            const totalPrice = products.reduce((acc, item) => acc + parseFloat(item.products_cart.current_price), 0);

            //@ts-ignore
            const loyalPrice = totalPrice * Number(user.user_loyalty_role.loyalty_roles.loyal_ratio);

            // Create invoice
            const invoice = await Invoice.create({
                user_id: user.id,
                price: String(totalPrice),
                success: false,
                final_price: String(loyalPrice)
            }, {transaction: this._transaction});

            // Add invoice-id to cartProduct model
            await CartProduct.update({invoice_product_id: invoice.id}, {
                where: {cart_id: cart?.id},
                transaction: this._transaction
            })

            // Fetch coupons
            const coupons = await this.CouponRepository.getAllCoupons(user_id);
            // @ts-ignore
            let products_id = products.map((el) => el.products_cart.product_category[0].id);

            // Find applicable coupon
            const current_coupon = coupons.find(coupon => products_id.includes(coupon.category_id) && coupon.is_applied && new Date(coupon.expiration_date).getTime() >= new Date().getTime());

            // Apply coupon if applicable
            if (current_coupon) {
                await invoice.update({
                    coupon_id: current_coupon.id,
                    discount: String(current_coupon.discount_price),
                    final_price: String(loyalPrice - Number(current_coupon.discount_price))
                }, {transaction: this._transaction});
            }
            await this._transaction.commit();

            await invoice.reload();

            // find invoice after invoice-id were added to cartProduct
            let updatedInvoice = await Invoice.findOne({
                where: {id: invoice.id},
                include: {
                    model: CartProduct,
                    as: 'invoice_products',
                    include: [{
                        model: Product,
                        as: 'products_cart'
                    }]
                },
            })

            let client = await this.RedisService.connectRedis();
            await client.json.set(`invoice:${invoice?.id}`, '$', updatedInvoice);
            await this.RedisService.closeRedis();

            return updatedInvoice

        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async updateInvoice(id: number, data: any, user_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let user = await this.UserRepository.getUserById(user_id);
            let invoice = await this.getInvoiceById(id);
            let coupons = await this.CouponRepository.getAllCoupons(user_id);
            let products = await this.ProductRepository.getAllProductsInCartByUserId(user_id);
            let cart = await Cart.findOne({where: {user_id}});

            if (!products || !products.length) {
                throw new ErrorService(404, 'Products in cart not found');
            }

            // @ts-ignore
            let products_id = products.map((el) => el.products_cart.product_category[0].id);
            const current_coupon = coupons.find(coupon => products_id.includes(coupon.category_id) && coupon.is_applied && new Date(coupon.expiration_date).getTime() >= new Date().getTime());
            // @ts-ignore
            const totalPrice = products.reduce((acc, item) => acc + parseFloat(item.products_cart.current_price), 0);
            // @ts-ignore
            const loyalPrice = totalPrice * Number(user.user_loyalty_role.loyalty_roles.loyal_ratio);

            let discount = current_coupon ? String(current_coupon.discount_price) : null;
            let finalPrice = current_coupon ? String(loyalPrice - Number(current_coupon.discount_price)) : String(loyalPrice);

            //@ts-ignore
            let {upgrade_condition} = user.user_loyalty_role.loyalty_roles
            //@ts-ignore
            let {current_upgrade_status} = user.user_loyalty_role
            //@ts-ignore
            let {next_loyalty_role} = user.user_loyalty_role.loyalty_roles

            await invoice.update({
                coupon_id: current_coupon ? current_coupon.id : null,
                discount,
                final_price: finalPrice
            }, {transaction: this._transaction});


            if (current_coupon?.is_applied && data?.success) {
                await this.CouponRepository.update(current_coupon.id, {is_used: true});
            }


            await invoice.update(data, {transaction: this._transaction});

            if (data?.success && ((current_upgrade_status === upgrade_condition - 1) || (current_upgrade_status === null))) {
                let next_user_loyalty_role = await LoyaltyRoles.findByPk(next_loyalty_role)
                await UserLoyaltyRole.update({
                    user_loyalty_role_id: next_loyalty_role,
                    next_user_loyalty_role_id: next_user_loyalty_role?.next_loyalty_role
                }, {
                    where: {user_id},
                    transaction: this._transaction
                })
            }
            if (data?.success) {
                await UserLoyaltyRole.update({current_upgrade_status: ++current_upgrade_status}, {
                    where: {user_id},
                    transaction: this._transaction
                })
            }
            if (data?.success) {
                for (const product of products) {
                    // @ts-ignore
                    const sameProductsCount = products.filter(p => p.products_cart.id === product.products_cart.id).length;
                    // @ts-ignore
                    let current_product = product.products_cart;
                    await Product.update({orders_count: current_product.orders_count + sameProductsCount}, {
                        where: {
                            id: current_product.id
                        }, transaction: this.transaction
                    })
                }
            }
            await this._transaction.commit();
            await invoice.reload();

            let client = await this.RedisService.connectRedis();
            await client.json.set(`invoice:${invoice?.id}`, '$', invoice);
            await this.RedisService.closeRedis();

            if (data?.success) {
                await CartProduct.destroy({where: {cart_id: cart?.id}})
            }

            return invoice
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async getInvoiceById(id: number) {
        try {
            let invoice = await Invoice.findByPk(id, {
                include: {
                    model: CartProduct,
                    as: 'invoice_products',
                    include: [{
                        model: Product,
                        as: 'products_cart'
                    }]
                }
            });
            if (!invoice) {
                throw new ErrorService(404, 'Invoice not found');
            }
            return invoice
        } catch (error) {
            throw error
        }
    }


    async getRedisInvoiceById(id: number) {
        try {
            let client = await this.RedisService.connectRedis();

            let invoice = await client.json.get(`invoice:${id}`)

            await this.RedisService.closeRedis();

            return invoice

        } catch (error) {
            throw error
        }
    }

    async getAllInvoices(id: number) {
        try {
            // let options: any = {
            //     include: [
            //         {
            //             model: CartProduct,
            //             as: 'invoice_products',
            //             include: [{model: Product, as: 'products_cart'}]
            //         },
            //         {
            //             model: User,
            //             as: 'user_invoices',
            //             attributes: ['id', 'email']
            //         }
            //     ],
            // };
            //
            // if (id) {
            //     options.include[1].where = {id};
            // }
            // return await Invoice.findAll(options);
            let client = await this.RedisService.connectRedis();
            let keys = await client.keys('invoice:*');
            let invoices = [];

            for (let key of keys) {
                let transaction = await client.json.get(key);

                if (id && transaction.user_id === id) {
                    invoices.push(transaction);
                } else if (!id) {
                    invoices.push(transaction);
                }
            }

            await this.RedisService.closeRedis();
            return invoices
        } catch (error) {
            throw error
        }
    }
}

export {InvoiceRepository}
