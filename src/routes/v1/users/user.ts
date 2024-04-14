import {
    checkVerificationCode,
    createUser,
    deleteUser,
    getAllUsers,
    getUserById, login, resendVerificationCode,
    sendVerificationCode,
    updateUser, updateUserStatus, verifyAccount
} from "../../../controllers/users";

const express = require("express");
const accountRouter = express.Router();

accountRouter.get('/users/all', getAllUsers)
accountRouter.get('/users/:id', getUserById)
accountRouter.post('/users/create', createUser)
accountRouter.patch('/users/update', updateUser)
accountRouter.delete('/users/:id/delete', deleteUser)
accountRouter.post('/users/send-verification-code', sendVerificationCode);
accountRouter.post('/users/check-verification-code', checkVerificationCode);
accountRouter.patch('/users/verify-account', verifyAccount);
accountRouter.patch('/users/resend-verification-code', resendVerificationCode);
accountRouter.post('/users/login', login);
accountRouter.patch('/users/update-user-status', updateUserStatus)

export {accountRouter} ;
