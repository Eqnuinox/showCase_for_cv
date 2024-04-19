import {Transaction} from "sequelize";
import sequelizeConnection from "../databases/sequelizeConnection";
import {Category, Coupon, User} from "../databases/models";
import {ErrorService} from "../services";
import {generateRandomString} from "../utils/generate.account.number";
import coupon from "../databases/models/Coupon";

class CouponRepository {
    get transaction() {
        return this._transaction;
    }

    set transaction(value) {
        this._transaction = value;
    }

    private _transaction: Transaction | undefined;

    async create(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let coupon_body = generateRandomString();
            let coupon = await Coupon.create({
                ...data,
                is_used: false,
                coupon_body: coupon_body
            })
            await this._transaction.commit();
            return coupon
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async destroy(id: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            const coupon = await Coupon.findByPk(id, {transaction: this._transaction});

            if (!coupon) {
                throw new ErrorService(404, 'Coupon not found with that id')
            }
            await coupon.destroy({transaction: this._transaction});
            await this._transaction.commit();
            return true
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async findOne(data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let coupon = await Coupon.findOne({
                where: {id: data.id}, include: [
                    {
                        model: User,
                        as: 'users_coupons',
                        attributes: ['email'],
                    },
                    {
                        model: Category,
                        as: 'coupon_category',
                        attributes: ['name'],
                    }
                ]
            });
            if (!coupon) {
                throw new ErrorService(404, 'Coupon not found')
            }
            await this._transaction.commit();
            return coupon;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async getAllCoupons(user_id?: number) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let options: any = {
                include: [
                    {
                        model: User,
                        as: 'users_coupons',
                        attributes: ['id', 'email']
                    }
                ],
                transaction: this._transaction
            };

            if (user_id) {
                options.include[0].where = { id: user_id };
            }

            let coupons = await Coupon.findAll(options);
            await this._transaction.commit();
            return coupons;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback();
            }
            throw error;
        }
    }

    async update(id: number, data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let coupon = await Coupon.findByPk(id, {transaction: this._transaction});
            if (!coupon) {
                throw new ErrorService(404, 'Coupon not found')
            }
            await coupon.update(data, {transaction: this._transaction});
            await this._transaction.commit();
            await coupon.reload();
            return coupon;
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }
}

export {CouponRepository}
