import {
    BelongsToManyAddAssociationMixin,
    BelongsToManyAddAssociationsMixin,
    BelongsToManyGetAssociationsMixin,
    BelongsToManyRemoveAssociationsMixin,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional
} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";
import Status from "./Status";

interface UserAttributes {
    id?: number;
    device_number?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    is_verified?: boolean;
    is_blocked?: boolean;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
    public id!: number;
    public device_number!: string;
    public first_name!: string;
    public last_name!: string;
    public email!: string;
    public phone!: string;
    public is_verified!: boolean;
    public is_blocked!: boolean;
    public readonly statuses?: Status[];

    public addStatuses!: BelongsToManyAddAssociationsMixin<Status, number>;
    public getStatuses!: BelongsToManyGetAssociationsMixin<Status>;
    public removeStatuses!: BelongsToManyRemoveAssociationsMixin<Status, number>;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    device_number: {
        type: DataTypes.STRING(9)
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
        allowNull: true,
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
    collate: 'utf8_general_ci'
});

User.belongsToMany(Status, { through: 'userRole', as: 'statuses' ,onDelete: 'CASCADE' });
Status.belongsToMany(User, { through: 'userRole', as: 'users' });

export default User;
