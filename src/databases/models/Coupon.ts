import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface CouponInterface {
    id?: number;
    expiration_date: Date;
    discount_price: number;
    coupon_body: string;
    is_used: boolean;
    is_applied: boolean;
    category_id?: number;
    user_id?: number;
}

class Coupon extends Model<InferAttributes<Coupon>, InferCreationAttributes<Coupon>> implements CouponInterface {
    public id!: number;
    public expiration_date!: Date;
    public discount_price!: number;
    public coupon_body!: string;
    public is_used!: boolean;
    public is_applied!: boolean;
    public category_id?: number;
    public user_id?: number;
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
    discount_price: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    coupon_body: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
    },
    is_used: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_applied: {
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

