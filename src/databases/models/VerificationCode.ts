import {DataTypes, InferAttributes, InferCreationAttributes, Model, Optional} from "sequelize";
import sequelizeConnection from "../sequelizeConnection";

interface VerificationCodeAttributes {
    id?: number;
    user_id: number;
    verification_code: number;
}

class VerificationCode extends Model<InferAttributes<VerificationCode>, InferCreationAttributes<VerificationCode>> {
    public id?: number;
    public user_id!: number;
    public verification_code!: number;
    public expired_at!: Date;
}

export interface VerificationInput extends Optional<VerificationCodeAttributes, 'id'> {
}

export interface VerificationOutput extends Required<VerificationCodeAttributes> {
}


VerificationCode.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "User",
            key: 'id'
        }
    },
    verification_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expired_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(new Date().setMinutes(new Date().getMinutes() + 1))
    }
}, {
    sequelize: sequelizeConnection,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    modelName: 'VerificationCode',
    tableName: 'verificationCodes',
    charset: 'utf8',
    collate: 'utf8mb4'
})

export default VerificationCode;

