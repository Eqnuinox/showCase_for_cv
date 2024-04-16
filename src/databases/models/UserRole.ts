import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize';
import sequelizeConnection from '../sequelizeConnection';

interface UserRoleInterface {
    id?: number
    userId?: number
    statusId?: number
}

class UserRole extends Model<InferAttributes<UserRole>, InferCreationAttributes<UserRole>> implements UserRoleInterface {
    public id!: number;
    public userId?: number;
    public statusId?: number;
}

UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
}, {
    sequelize: sequelizeConnection,
    modelName: 'UserRole',
    tableName: 'userRole',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default UserRole;
