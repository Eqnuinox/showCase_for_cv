import {
    checkVerificationCode,
    createUser,
    deleteUser,
    getAllUsers,
    getUserById, login, refreshTokens, resendVerificationCode,
    sendVerificationCode,
    updateUser, updateUserStatus, verifyAccount
} from "../../../controllers/users";
import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {
    checkAdminStatusMiddleware,
} from "../../../middlewares/auth/checkStatusUsers.middleware";

const express = require("express");
const accountRouter = express.Router();

accountRouter.get('/users/all', checkAccessUsersMiddleware, getAllUsers)
accountRouter.get('/users/:id', checkAccessUsersMiddleware, getUserById)
accountRouter.post('/users/create', createUser)
accountRouter.patch('/users/update', checkAccessUsersMiddleware, updateUser)
accountRouter.delete('/users/:id/delete', checkAccessUsersMiddleware, checkAdminStatusMiddleware, deleteUser)
accountRouter.post('/users/send-verification-code', sendVerificationCode);
accountRouter.post('/users/check-verification-code', checkVerificationCode);
accountRouter.patch('/users/verify-account', verifyAccount);
accountRouter.patch('/users/resend-verification-code', resendVerificationCode);
accountRouter.post('/users/login', login);
accountRouter.patch('/users/update-user-status', checkAccessUsersMiddleware, checkAdminStatusMiddleware, updateUserStatus);
accountRouter.get('/users/token/refresh', refreshTokens)

export {accountRouter} ;
