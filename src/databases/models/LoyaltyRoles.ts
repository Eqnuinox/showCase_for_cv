import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface LoyaltyRolesInterface {
    id?: number;
    title: string;
    loyal_ratio: number;
}

class LoyaltyRoles extends Model<InferAttributes<LoyaltyRoles>, InferCreationAttributes<LoyaltyRoles>> implements LoyaltyRolesInterface {
    public id!: number;
    public title!: string;
    public loyal_ratio!: number;
}

LoyaltyRoles.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    loyal_ratio: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: false,
    modelName: 'LoyaltyRoles',
    tableName: 'loyaltyRoles',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default LoyaltyRoles;

