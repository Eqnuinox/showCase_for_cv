import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface CartProductInterface {
    id: number;
}

class CartProduct extends Model<InferAttributes<CartProduct>, InferCreationAttributes<CartProduct>> implements CartProductInterface {
    public id!: number;
}

CartProduct.init({
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
    modelName: 'CartProduct',
    tableName: 'cartProducts',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default CartProduct;

