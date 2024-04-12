import {Transaction} from "sequelize";
import {VerificationCode} from "../databases/models";
import sequelizeConnection from "../databases/sequelizeConnection";
import {numericSequence} from "node-verification-code";

class VerificationCodeRepository {
    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    public findOne(data: any) {
        try {
            return VerificationCode.findOne(data)
        } catch (error) {
            throw error;
        }
    }

    public async create(user_id: number): Promise<VerificationCode> {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const userVerificationCode = await VerificationCode.create({
                user_id: user_id,
                expired_at: new Date(new Date().setMinutes(new Date().getMinutes() + 1)),
                verification_code: Number(numericSequence(4)),
            }, {transaction: this._transaction});
            await this._transaction.commit();
            return userVerificationCode;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async destroy(user_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const data = await VerificationCode.destroy({
                where: {
                    user_id: user_id
                },
                transaction: this._transaction
            });
            await this._transaction.commit();
            return data;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error;
        }
    }
}

export {VerificationCodeRepository}
