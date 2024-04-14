import {UserInput, UserOutput} from "databases/models/User";
import {Status, User} from "databases/models";
import sequelizeConnection from "databases/sequelizeConnection";
import {Includeable, Transaction} from "sequelize";
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

    private commonInclude: Includeable[] = [
        {
            model: Status,
            as: 'statuses',
            attributes: ['id', 'status'],
            through: {attributes: []}
        },
    ];

    public async create(): Promise<UserOutput> {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let device_number = generateRandomString();
            // @ts-ignore
            const user = await User.create({
                device_number: device_number,
            }, {include: this.commonInclude, transaction: this._transaction});
            const statuses = await Status.findAll({where: {status: ['Guest']}});

            // Добавьте статусы пользователю
            await user.addStatuses(statuses, {transaction: this._transaction});
            await this._transaction.commit();
            await user.reload();
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
            const user = await User.findByPk(id, {include: this.commonInclude, transaction: this._transaction});
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }

            await user.update(data, {transaction: this._transaction});
            await this._transaction.commit();
            await user.reload();
            return user;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async updateUserStatus(id: number, statuses: string[]) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const user = await User.findByPk(id, {include: this.commonInclude, transaction: this._transaction});
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            await user.removeStatuses(user.statuses, {transaction: this._transaction})
            const currentStatuses = await Status.findAll({where: {status: statuses}});
            await user.addStatuses(currentStatuses, {transaction: this._transaction});
            await this._transaction.commit()
            await user.reload();
            return user;

        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    public async delete(id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const user = await User.findByPk(id, {transaction: this._transaction});
            if (!user) {
                throw new ErrorService(404, 'Account is not exist');
            }
            await user.destroy({transaction: this._transaction});
            await this._transaction.commit();
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }


    public async getAllUsers() {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const allUsers = await User.findAll({
                include: this.commonInclude,
                transaction: this._transaction
            });
            await this._transaction.commit();
            return allUsers;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async getUserById(id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let user = await User.findByPk(id, {
                include: this.commonInclude,
                transaction: this._transaction
            });
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            await this._transaction.commit();
            return user;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    public async findOne(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let user = await User.findOne({where: {email: data.email}, include: this.commonInclude,});
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            await this._transaction.commit();
            return user
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
        }
    }
}

export {UserRepository}
