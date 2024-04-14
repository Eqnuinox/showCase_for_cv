import {Includeable, Transaction} from "sequelize";
import {Category, Product} from "../databases/models";
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
            let product = await Product.create(data, {include: this.commonInclude, transaction: this._transaction});
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
            this._transaction = await sequelizeConnection.transaction();
            let product = await Product.findByPk(id, {include: this.commonInclude, transaction: this._transaction});
            if (!product) {
                throw new ErrorService(404, 'Product not found');
            }
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

    public async updateProduct(id: number, data: any){
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
        } catch (error){
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }
}


export {ProductRepository}
