import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface TransactionInterface {
    id: number;
    price: number;
    discount: number;
    final_price: number;
    success: boolean;


}

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> implements TransactionInterface {
    public id!: number;
    public price!: number;
    public discount!: number;
    public final_price!: number;
    public success!: boolean;
}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    discount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    final_price: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    success: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }

}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Transaction',
    tableName: 'transactions',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Transaction;

