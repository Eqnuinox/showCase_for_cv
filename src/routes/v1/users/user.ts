import {
    checkVerificationCode,
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    sendVerificationCode,
    updateUser, verifyAccount
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
accountRouter.patch('/users/verify-account', verifyAccount)

export {accountRouter} ;
