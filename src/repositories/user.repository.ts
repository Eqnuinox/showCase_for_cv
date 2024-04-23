import {UserOutput} from "databases/models/User";
import {LoyaltyRoles, Status, User, UserLoyaltyRole} from "databases/models";
import sequelizeConnection from "databases/sequelizeConnection";
import {Includeable, Transaction} from "sequelize";
import {generateRandomString} from "../utils/generate.account.number";
import {ErrorService} from "../services";
import {Cart} from "../databases/models";


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
        }, {
            model: UserLoyaltyRole,
            as: 'user_loyalty_role',
            attributes: ['id', 'current_upgrade_status'],
            include: [{model: LoyaltyRoles, as: 'loyalty_roles'}, {model: LoyaltyRoles, as: 'next_loyalty_role'}]
        }
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

            await UserLoyaltyRole.create({
                user_id: user.id,
                user_loyalty_role_id: 4,
                next_user_loyalty_role_id: 1
            }, {transaction: this._transaction})
            await Cart.create({id: user.id, user_id: user.id}, {transaction: this._transaction});
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
            if (!statuses || !Array.isArray(statuses) || !statuses.length) {
                throw new ErrorService(400, 'Statuses array cannot be empty');
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

    public async updateUserLoyaltyRole(id: number, loyal_role_id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            await this.getUserById(id);

            const current_user_role = await UserLoyaltyRole.findOne({where: {user_id: id}});
            await current_user_role?.update({
                user_id: id,
                user_loyalty_role_id: loyal_role_id
            }, {transaction: this._transaction});

            await current_user_role?.reload();
            await this._transaction.commit();

            return current_user_role;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
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
            return await User.findAll({
                include: this.commonInclude,
            });
        } catch (error) {
            throw error
        }
    }

    public async getUserById(id: number) {
        try {
            let user = await User.findByPk(id, {
                include: this.commonInclude,
            });
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            return user;
        } catch (error) {
            throw error
        }
    }

    public async findOne(data: any) {
        try {
            let user = await User.findOne({where: {email: data.email}, include: this.commonInclude,});
            if (!user) {
                throw new ErrorService(404, 'User not found');
            }
            return user
        } catch (error) {
            throw error
        }
    }
}

export {UserRepository}
