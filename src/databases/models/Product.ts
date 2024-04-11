import {DataTypes, InferAttributes, InferCreationAttributes, Model, Optional} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";

interface ProductInterface {
    id?: number;
    title: string;
    description?: string;
    count: number;
    price: string;
}

class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> implements ProductInterface {
    public id!: number;
    public title!: string;
    public description!: string;
    public count!: number;
    public price!: string;

}

Product.init({
    id: {
        type: DataTypes.NUMBER,
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

    price: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Product',
    tableName: 'products',
    charset: 'utf8',
    collate: 'utf8mb4'
});


export default Product;
