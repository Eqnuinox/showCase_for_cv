import {Transaction} from "sequelize";
import sequelizeConnection from "../databases/sequelizeConnection";
import {Coupon, User} from "../databases/models";
import {ErrorService} from "../services";
import {generateRandomString} from "../utils/generate.account.number";

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
                        attributes: ['id', 'email'],
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

    async getAllCoupons() {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let coupons = await Coupon.findAll({
                include: [
                    {
                        model: User,
                        as: 'users_coupons',
                        attributes: ['id', 'email']
                    }
                ], transaction: this._transaction
            })
            await this._transaction.commit();
            return coupons
        } catch (error) {
            if (this._transaction) {
                await this._transaction.rollback()
            }
            throw error
        }
    }

    async update(id: number, data: any) {
        try {
            this._transaction = await sequelizeConnection.transaction();
            let coupon = await Coupon.findByPk(id, {transaction: this._transaction});
            if (!coupon) {
                throw new ErrorService(404, 'Coupon not found')
            }
            console.log(coupon)
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
