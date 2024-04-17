import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface ProductInterface {
    id: number
    title?: string
    description?: string
    max_price?: string
    min_price?: string
    count?: number
    orders_count?: number
    favorite_count?: number
    current_price?: number
    ratio?: number

}


class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> implements ProductInterface {

    public id!: number;
    public title!: string;
    public description!: string;
    public count!: number;
    public max_price!: string
    public min_price!: string
    public orders_count!: number
    public favorite_count!: number
    public current_price!: number
    public ratio!: number

    public categoryId?: number;


}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    current_price: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    max_price: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    min_price: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    orders_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    favorite_count: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ratio: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Product',
    tableName: 'products',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

// Product.belongsTo(Category, {foreignKey: 'categoryId', as: 'product_category'});

export default Product;

