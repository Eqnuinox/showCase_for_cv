import {UserInput, UserOutput} from "databases/models/User";
import {User} from "databases/models";
import sequelizeConnection from "databases/sequelizeConnection";
import {Transaction} from "sequelize";
import {ErrorService} from "services";
import {generateRandomString} from "../utils/generate.account.number";

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
            let account_number = generateRandomString();
            // @ts-ignore
            const user = await User.create({
                account_number: account_number,
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
}

export {UserRepository}
