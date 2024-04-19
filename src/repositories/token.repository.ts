import {Transaction} from "sequelize";
import sequelizeConnection from "../databases/sequelizeConnection";
import {Token} from "../databases/models";

class TokenRepository {

    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    public async create(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const token = await Token.create(data);
            await this._transaction.commit();
            return token;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async destroy(refresh_token: string) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            await Token.destroy({
                where: {
                    refresh_token: refresh_token.split(' ')[1]
                }, transaction: this._transaction
            })

            await this._transaction.commit();
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async findOne(data: any) {
        try {
            let token = await Token.findOne(data);
            return token
        } catch (error) {
            throw error
        }
    }

    public async findTokenByUserId(user_id: number) {
        try {
            let token = await Token.findOne({where: {
                user_id: user_id
                }});
            return token
        } catch (error) {
            throw error
        }
    }
}

export {TokenRepository}
