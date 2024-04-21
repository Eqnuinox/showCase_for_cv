import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface CartInterface {
    id?: number;
    user_id?: number;
}

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> implements CartInterface {
    public id!: number;
    public user_id?:number
}

Cart.init({
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
    modelName: 'Cart',
    tableName: 'carts',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Cart;

