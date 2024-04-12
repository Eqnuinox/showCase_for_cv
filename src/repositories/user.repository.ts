import {UserInput, UserOutput} from "databases/models/User";
import {User} from "databases/models";
import sequelizeConnection from "databases/sequelizeConnection";
import {Transaction} from "sequelize";
import {generateRandomString} from "../utils/generate.account.number";
import {ErrorService} from "../services";


class UserRepository {

    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    public async create(): Promise<UserOutput> {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let device_number = generateRandomString();
            // @ts-ignore
            const user = await User.create({
                device_number: device_number,
                status_id: 5
            }, {transaction: this._transaction});
            await this._transaction.commit();
            return user;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async update(id: number, data: any): Promise<UserOutput> {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const user = await User.findByPk(id, {transaction: this._transaction});
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            await user.update(data);
            await this._transaction.commit();
            return user;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async delete(id: number){
        try{
            this._transaction = await sequelizeConnection.transaction();
            const user = await User.findByPk(id, {transaction: this._transaction});
            if (!user) {
                throw new ErrorService(404, 'Account is not exist');
            }
            await user.destroy({ transaction: this._transaction });
            await this._transaction.commit();
        } catch (error){
            if (this._transaction){
                await this._transaction.rollback()
            }
            throw error
        }
    }
}

export {UserRepository}
