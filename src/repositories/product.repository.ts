import {Includeable, Transaction} from "sequelize";
import {Cart, CartProduct, Category, Product, ProductCategory, User} from "../databases/models";
import sequelizeConnection from "../databases/sequelizeConnection";
import {ErrorService} from "../services";

class ProductRepository {
    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;
    private commonInclude: Includeable[] = [
        {
            model: Category,
            attributes: ['id', 'name'],
            as: 'product_category',
        }
    ]

    public async getAllProducts() {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let allProducts = await Product.findAll();
            await this._transaction?.commit();
            return allProducts
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async createProduct(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let product = await Product.create(data, {transaction: this._transaction});
            await ProductCategory.create({
                category_id: data.category_id,
                product_id: product.id,
            }, {transaction: this._transaction})
            await this._transaction.commit();
            await product.reload();
            return product
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async deleteProduct(id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let product = await Product.findByPk(id, {transaction: this._transaction});
            if (!product) {
                throw new ErrorService(404, 'Product not found');
            }
            await product.destroy({transaction: this._transaction});
            await this._transaction.commit()
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async getProductById(id: number) {
        try {
            let product = await Product.findByPk(id, {include: this.commonInclude});
            if (!product) {
                throw new ErrorService(404, 'Product not found');
            }
            await product.reload();
            return product
        } catch (error) {
            throw error
        }
    }

    public async updateProduct(id: number, data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let product = await Product.findByPk(id, {include: this.commonInclude, transaction: this._transaction});
            if (!product) {
                throw new ErrorService(404, 'Product not found');
            }
            await product.update(data);
            await this._transaction.commit();
            await product.reload();
            return product
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async addToCart(id: number, user_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let user = await User.findByPk(user_id, {transaction: this._transaction});
            await this.getProductById(id);

            if (!user) {
                throw new ErrorService(404, 'User not found');
            }

            let cartProduct = await CartProduct.create({
                cart_id: user_id,
                product_id: id
            }, {
                include: [{
                    model: Product,
                    as: 'products_cart',
                    attributes: ['id', 'title', 'description', 'current_price']
                }, {
                    model: Cart,
                    as: 'products_in_cart',
                    attributes: ['id'],
                    include: [{model: User, as: 'user_cart', attributes: ['email', 'first_name', 'last_name']}]
                }],
                transaction: this._transaction
            });

            await this._transaction.commit();
            await cartProduct.reload();

            return cartProduct;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async removeFromCart(id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let cartProduct = await CartProduct.findByPk(id, {transaction: this._transaction})
            if (!cartProduct) {
                throw new ErrorService(404, 'CartProduct not found');
            }
            await cartProduct.destroy({transaction: this._transaction});
            await this._transaction.commit();
            return cartProduct;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error
        }
    }

    public async getAllProductsInCart(cart_id: number) {
        try {
            let allCartProducts = await CartProduct.findAll({
                where: {cart_id},
                include: [{
                    model: Product,
                    as: 'products_cart',
                    attributes: ['id', 'title', 'description', 'current_price']
                }]
            })
            if (!allCartProducts.length) {
                throw new ErrorService(404, 'Cart not found')
            }
            return allCartProducts
        } catch (error) {
            throw error
        }
    }
}


export {ProductRepository}
