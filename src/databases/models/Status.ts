import {DataTypes, Model, InferAttributes, InferCreationAttributes, Optional} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";

interface StatusAttributes {
    id?: number;
    code: string;
    name: string;
}

export interface StatusInput extends Optional<StatusAttributes, 'id'> {}

export interface StatusOutput extends Required<StatusAttributes> {}

class Status extends Model <InferAttributes<Status>, InferCreationAttributes<Status>>{
    public id?: number;
    public code!: string;
    public name!: string;
}

Status.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(3),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: false,
    tableName: 'statuses',
    modelName: 'Status',
});



export default Status;
