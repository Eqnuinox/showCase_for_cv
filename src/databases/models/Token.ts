import {DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import User from "./User";
import sequelizeConnection from "../sequelizeConnection";

interface TokenAttributes {
    id?: number
    user_id: number
    refresh_token: string
}

class Token extends Model<InferAttributes<Token>, InferCreationAttributes<Token>> implements TokenAttributes {
    public id!: number
    public user_id!: number
    public refresh_token!: string
}

Token.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
    },

    refresh_token: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'Token',
    tableName: 'tokens',
    charset: 'utf8',
    collate: 'utf8_general_ci'
})

export default Token
