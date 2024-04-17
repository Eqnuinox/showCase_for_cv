import {CouponRepository} from "repositories";

class CouponService {
    protected CouponRepository: CouponRepository;

    constructor() {
        this.CouponRepository = new CouponRepository();
    }


    public async createCoupon(data: any) {
        try {
            return await this.CouponRepository.create(data);
        } catch (error) {
            throw error
        }
    }

    public async deleteCoupon(id: number) {
        try {
            return await this.CouponRepository.destroy(id);
        } catch (error) {
            throw error
        }
    }

    public async updateCoupon(id: number, data: any) {
        try {
            return await this.CouponRepository.update(id, data);
        } catch (error) {
            throw error
        }
    }

    public async getAllCoupons() {
        try {
            return await this.CouponRepository.getAllCoupons();
        } catch (error) {
            throw error
        }
    }
}

export {CouponService}
