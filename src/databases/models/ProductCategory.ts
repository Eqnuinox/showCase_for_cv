import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface ProductCategoryInterface {
    id: number;
}

class ProductCategory extends Model<InferAttributes<ProductCategory>, InferCreationAttributes<ProductCategory>> implements ProductCategoryInterface {
    public id!: number;
    public category_id?: number;
    public product_id?: number;

}

ProductCategory.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'ProductCategory',
    tableName: 'productCategories',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default ProductCategory;

