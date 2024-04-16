import {DataTypes, InferAttributes, InferCreationAttributes, Model} from 'sequelize'
import sequelizeConnection from "../sequelizeConnection";


export interface FavoriteListInterface {
    id: number;
}

class FavoriteList extends Model<InferAttributes<FavoriteList>, InferCreationAttributes<FavoriteList>> implements FavoriteListInterface {
    public id!: number;
}

FavoriteList.init({
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
    modelName: 'FavoriteList',
    tableName: 'favoriteLists',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

export default FavoriteList;

