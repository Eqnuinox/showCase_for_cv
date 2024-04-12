import {ResponseHelper} from "../../helpers/response";
import {UserService} from "../../services/user.service";
import {Request, Response} from "express";
import {VerificationCodeService} from "../../services";

export const createUser = async (req: Request, res: Response) => {
    try {
        let user = await new UserService().createAccount();
        ResponseHelper.sendResponse(res, 'Inserted successfully', user);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        let {id, data} = req.body;
        let user = await new UserService().updateAccount(id, data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        await new UserService().deleteAccount(id);
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        let allUsers = await new UserService().getAllUsers();
        ResponseHelper.sendResponse(res, 'Inserted successfully', allUsers)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        let id = Number(req.params.id);
        let user = await new UserService().getUserById(id);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const sendVerificationCode = async (req: Request, res: Response) => {
    try {
        const data: { user_id: number, email: string } = req.body;
        await new UserService().sendVerificationCode(data);
        ResponseHelper.sendResponse(res, 'Your code has been sent');
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const resendVerificationCode = async (req: Request, res: Response) => {
    try {
        const {email, user_id} = req.body;
        await new VerificationCodeService().resendVerificationCode(email, user_id);
        ResponseHelper.sendResponse(res, 'Your code has been sent');
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const checkVerificationCode = async (req: Request, res: Response) => {
    try {
        const data: {user_id: number, verification_code: number} = req.body
        await new VerificationCodeService().checkVerificationCode(data);
        ResponseHelper.sendResponse(res, 'Successfully');

    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const verifyAccount = async (req: Request, res: Response) => {
    let {user_id, email} = req.body;
    try {
        let user= await new UserService().verifiedUser(user_id, email);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
