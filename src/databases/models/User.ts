import { DataTypes, InferAttributes, InferCreationAttributes, Model, Optional } from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";

interface UserAttributes {
    id?: number;
    account_number?: string;
    status?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone?: string;
    is_verified?: boolean;
    last_logged_in?: Date;
    is_blocked?: boolean;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
    public id!: number;
    public account_number!: string;
    public status!: string;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: string;
    public is_verified!: boolean;
    public is_blocked!: boolean;
}

User.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    account_number: {
        type: DataTypes.STRING(9)
    },

    status: {
        type: DataTypes.STRING(10),
        allowNull: true
    },

    first_name: {
        type: DataTypes.STRING(50),
        allowNull: true
    },

    last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },

    phone: {
        type: DataTypes.STRING(20),
        allowNull: true
    },

    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },

    is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'User',
    tableName: 'users',
    charset: 'utf8',
    collate: 'utf8mb4'
});


export default User;
