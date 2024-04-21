import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface InvoiceInterface {
    id?: number;
    price: string;
    discount?: string | null;
    final_price?: string;
    success: boolean;
    cart_product_id?: number;
    coupon_id?: number | null;
    user_id?: number;

}

class Invoice extends Model<InferAttributes<Invoice>, InferCreationAttributes<Invoice>> implements InvoiceInterface {
    public id?: number;
    public price!: string;
    public discount?: string | null;
    public final_price?: string;
    public success!: boolean;
    public cart_product_id?: number;
    public user_id?: number;
    public coupon_id?: number | null;
}

Invoice.init({
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
        allowNull: true,
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
    modelName: 'Invoice',
    tableName: 'invoices',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Invoice;

