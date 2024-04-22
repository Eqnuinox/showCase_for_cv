import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface UserLoyaltyRoleInterface {
    id?: number;
    user_id?: number;
    user_loyalty_role_id?: number;

}

class UserLoyaltyRole extends Model<InferAttributes<UserLoyaltyRole>, InferCreationAttributes<UserLoyaltyRole>> implements UserLoyaltyRoleInterface {
    public id?: number;
    public user_id?: number;
    public user_loyalty_role_id?: number;
}

UserLoyaltyRole.init({
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
    modelName: 'UserLoyaltyRole',
    tableName: 'userLoyaltyRoles',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default UserLoyaltyRole;

