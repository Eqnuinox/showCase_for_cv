import {DataTypes, InferAttributes, InferCreationAttributes, Model, Optional} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";
import Product from "./Product";


interface CategoryAttributes {
    id?: number;
    name: string;
    products?: Product[];
}

export interface StatusInput extends Optional<CategoryAttributes, 'id'> {
}

export interface StatusOutput extends Required<CategoryAttributes> {
}

class Category extends Model <InferAttributes<Category>, InferCreationAttributes<Category>> implements CategoryAttributes {
    public id?: number;
    public name!: string;

    public products?: Product[];
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: false,
    tableName: 'categories',
    modelName: 'Category',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Category;

