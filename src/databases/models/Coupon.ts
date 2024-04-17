import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface CouponInterface {
    id?: number;
    expiration_date: Date;
    count: number;
    coupon_body: string;
    is_used: boolean;
}

class Coupon extends Model<InferAttributes<Coupon>, InferCreationAttributes<Coupon>> implements CouponInterface {
    public id!: number;
    public expiration_date!: Date;
    public count!: number;
    public coupon_body!: string;
    public is_used!: boolean;
}

Coupon.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    coupon_body: {
        type: DataTypes.STRING(25),
        allowNull: true,
        unique: true,
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }


}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Coupon',
    tableName: 'coupons',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default Coupon;

