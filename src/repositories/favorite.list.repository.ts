import {ProductRepository} from "repositories";
import {Transaction, where} from "sequelize";
import {FavoriteList, Product, User} from "../databases/models";
import sequelizeConnection from "../databases/sequelizeConnection";
import {ErrorService} from "../services";

class FavoriteListRepository {

    private ProductRepository: ProductRepository;

    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    public async addProductToFavoriteList(user_id: number, product_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let product = await this.ProductRepository.getProductById(product_id);
            let favorite = await FavoriteList.findOne({where: {user_id, product_id}, transaction: this._transaction});
            if (favorite) {
                throw new ErrorService(409, 'This product is already in your favorites list')
            }
            await FavoriteList.create({user_id, product_id}, {transaction: this._transaction});
            await product.update({
                favorite_count: product.favorite_count + 1
            }, {transaction: this._transaction});
            await this._transaction.commit();
            return true
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async removeProductFromFavoriteList(user_id: number, product_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let favorite = await FavoriteList.findOne({where: {user_id, product_id}, transaction: this._transaction});
            let product = await this.ProductRepository.getProductById(product_id);
            await product.update({
                favorite_count: product.favorite_count - 1
            }, {transaction: this.transaction})
            if (!favorite) {
                throw new ErrorService(404, 'Product is not in favorites')
            }
            await favorite.destroy({transaction: this._transaction});
            await this._transaction.commit();
            return true
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async getAllProductsFromFavoriteList(user_id?: number) {
        try {
            let options: any = {
                include: [
                    {
                        model: Product,
                        as: 'favorite_products'
                    },
                    {
                        model: User,
                        as: 'favorite_user',
                        attributes: ['id', 'email']
                    }
                ],
            };
            if (user_id) {
                options.include[1].where = {id: user_id};
            }
            return await FavoriteList.findAll(options);
        } catch (error) {
            throw error
        }
    }

}

export {FavoriteListRepository}
