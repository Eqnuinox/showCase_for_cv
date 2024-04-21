import {Transaction} from "sequelize";
import sequelizeConnection from "../databases/sequelizeConnection";
import {CartProduct, Invoice, User} from "../databases/models";
import transaction from "../databases/models/Transaction";
import {CouponRepository, ProductRepository, UserRepository} from "repositories";
import {ErrorService} from "../services";


class InvoiceRepository {

    private UserRepository: UserRepository;
    private CouponRepository: CouponRepository;
    private ProductRepository: ProductRepository;

    constructor() {
        this.UserRepository = new UserRepository();
        this.CouponRepository = new CouponRepository();
        this.ProductRepository = new ProductRepository();
    }

    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    async createInvoice(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let {user_id, cart_product_id} = data;

            // Fetch user
            const user = await this.UserRepository.getUserById(user_id);
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }

            // Fetch products in cart
            const products = await this.ProductRepository.getAllProductsInCart(cart_product_id);
            if (!products || !products.length) {
                throw new ErrorService(404, 'Products in cart not found');
            }

            // Calculate total price
            // @ts-ignore
            const totalPrice = products.reduce((acc, item) => acc + parseFloat(item.products_cart.current_price), 0);


            // Create invoice
            const invoice = await Invoice.create({
                user_id: user.id,
                price: String(totalPrice),
                success: false,
                cart_product_id,
                final_price: String(totalPrice)
            }, {transaction: this._transaction});

            // Fetch coupons
            const coupons = await this.CouponRepository.getAllCoupons(user_id);
            // @ts-ignore
            const local_category_id = products.length > 0 ? products[0].products_cart.product_category[0].id : null;

            // Find applicable coupon
            const current_coupon = coupons.find(coupon => coupon.category_id === local_category_id && coupon.is_applied && new Date(coupon.expiration_date).getTime() >= new Date().getTime());

            // Apply coupon if applicable
            if (current_coupon) {
                await invoice.update({
                    coupon_id: current_coupon.id,
                    discount: String(current_coupon.discount_price),
                    final_price: String(totalPrice - Number(current_coupon.discount_price))
                }, {transaction: this._transaction});
            }
            await this._transaction.commit();

            await invoice.reload();

            return {invoice, products};

        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async updateInvoice(id: number, user_id: number, cart_product_id: number, data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let invoice = await this.getInvoiceById(id);
            let coupons = await this.CouponRepository.getAllCoupons(user_id);
            const products = await this.ProductRepository.getAllProductsInCart(cart_product_id);
            if (!products || !products.length) {
                throw new ErrorService(404, 'Products in cart not found');
            }
            // @ts-ignore
            const local_category_id = products.length > 0 ? products[0].products_cart.product_category[0].id : null;

            const current_coupon = coupons.find(coupon => coupon.category_id === local_category_id && coupon.is_applied && new Date(coupon.expiration_date).getTime() >= new Date().getTime());

            // @ts-ignore
            const totalPrice = products.reduce((acc, item) => acc + parseFloat(item.products_cart.current_price), 0);

            let discount = current_coupon ? String(current_coupon.discount_price) : null;
            let finalPrice = current_coupon ? String(totalPrice - Number(current_coupon.discount_price)) : String(totalPrice);

            await invoice.update({
                coupon_id: current_coupon ? current_coupon.id : null,
                discount,
                final_price: finalPrice
            }, { transaction: this._transaction });


            if (current_coupon?.is_applied && data?.success) {
                await this.CouponRepository.update(current_coupon.id, {is_used: true});
            }
            await invoice.update(data, {transaction: this._transaction});
            await this._transaction.commit();
            await invoice.reload();
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
            let invoice = await Invoice.findByPk(id);
            if (!invoice) {
                throw new ErrorService(404, 'Invoice not found');
            }
            return invoice
        } catch (error) {
            throw error
        }
    }

    async getAllInvoices(id: number) {
        try {
            let options: any = {
                include: [
                    {
                        model: User,
                        as: 'user_invoices',
                        attributes: ['id', 'email']
                    }
                ],
            };

            if (id) {
                options.include[0].where = {id};
            }
            return await Invoice.findAll(options);
        } catch (error) {
            throw error
        }
    }
}

export {InvoiceRepository}
