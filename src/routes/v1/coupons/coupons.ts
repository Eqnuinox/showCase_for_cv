import {createCoupon, deleteCoupon, getAllCoupons, updateCoupon} from "../../../controllers/coupons";
import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {checkAdminStatusMiddleware} from "../../../middlewares/auth/checkStatusUsers.middleware";

const express = require("express");
const couponRouter = express.Router();

couponRouter.get('/coupons/all', checkAccessUsersMiddleware, checkAdminStatusMiddleware, getAllCoupons);
couponRouter.post('/coupons/create', checkAccessUsersMiddleware, checkAdminStatusMiddleware, createCoupon);
couponRouter.delete('/coupons/:id/delete', checkAccessUsersMiddleware, checkAdminStatusMiddleware, deleteCoupon);
couponRouter.patch('/coupons/update', checkAccessUsersMiddleware, checkAdminStatusMiddleware, updateCoupon);

export {couponRouter};
