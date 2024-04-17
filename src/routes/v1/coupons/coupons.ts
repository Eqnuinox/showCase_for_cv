import {accountRouter} from "../users";
import {createCoupon, deleteCoupon, getAllCoupons, updateCoupon} from "../../../controllers/coupons";
import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {checkAdminStatusMiddleware} from "../../../middlewares/auth/checkStatusUsers.middleware";

const express = require("express");
const couponRouter = express.Router();

accountRouter.get('/coupons/all', checkAccessUsersMiddleware, checkAdminStatusMiddleware, getAllCoupons);
accountRouter.post('/coupons/create', checkAccessUsersMiddleware, checkAdminStatusMiddleware, createCoupon);
accountRouter.delete('/coupons/:id/delete', checkAccessUsersMiddleware, checkAdminStatusMiddleware, deleteCoupon);
accountRouter.patch('/coupons/update', checkAccessUsersMiddleware, checkAdminStatusMiddleware, updateCoupon);

export {couponRouter};
