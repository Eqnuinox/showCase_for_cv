import {DataTypes, Model, InferAttributes, InferCreationAttributes, Optional} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";

interface StatusAttributes {
    id?: number;
    status: string;
}

export interface StatusInput extends Optional<StatusAttributes, 'id'> {}

export interface StatusOutput extends Required<StatusAttributes> {}

class Status extends Model <InferAttributes<Status>, InferCreationAttributes<Status>>{
    public id?: number;
    public status!: string;
}

Status.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelizeConnection,
    timestamps: false,
    tableName: 'statuses',
    modelName: 'Status',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});




export default Status;
