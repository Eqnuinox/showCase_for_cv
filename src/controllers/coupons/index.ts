import {Request, Response} from "express";
import {ResponseHelper} from "../../helpers/response";
import {CouponService} from "../../services";

export const createCoupon = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let coupon = await new CouponService().createCoupon(data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', coupon)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const updateCoupon = async (req: Request, res: Response) => {
    try {
        let {id, data} = req.body;
        let coupon = await new CouponService().updateCoupon(id, data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', coupon)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const deleteCoupon = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await new CouponService().deleteCoupon(Number(id));
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getAllCoupons = async (req: Request, res: Response) => {
    try {
        const {id} = req.query;
        let coupons = await new CouponService().getAllCoupons(Number(id) ?? '');
        ResponseHelper.sendResponse(res, 'Inserted successfully', coupons)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
