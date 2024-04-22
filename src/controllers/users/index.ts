import {ResponseHelper} from "../../helpers/response";
import {Request, Response} from "express";
import {ErrorService, TokenService, UserService, VerificationCodeService} from "../../services";

export const createUser = async (req: Request, res: Response) => {
    try {
        let user = await new UserService().createAccount();
        ResponseHelper.sendResponse(res, 'Inserted successfully', user);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        const tokenService = new TokenService();
        let user = await new UserService().login(data.email);
        const tokens = await tokenService.generateTokens(user.id);
        await tokenService.saveToken(user.id, tokens.refresh_token);
        ResponseHelper.sendResponse(res, 'Inserted successfully', {...{user}, ...{tokens}})
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
        const data: { email: string, user_id: number } = req.body;
        await new UserService().sendVerificationCode(data);
        ResponseHelper.sendResponse(res, 'Your code has been sent');
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const resendVerificationCode = async (req: Request, res: Response) => {
    try {
        const {email, user_id} = req.body;
        await new VerificationCodeService().resendVerificationCode(user_id, email);
        ResponseHelper.sendResponse(res, 'Your code has been sent');
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const checkVerificationCode = async (req: Request, res: Response) => {
    try {
        const data: { user_id: number, verification_code: number } = req.body
        let user = await new VerificationCodeService().checkVerificationCode(data);
        ResponseHelper.sendResponse(res, 'Successfully', user);

    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const verifyAccount = async (req: Request, res: Response) => {
    let {user_id, email} = req.body;
    try {
        let user = await new UserService().verifiedUser(user_id, email);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const updateUserStatus = async (req: Request, res: Response) => {
    let {id, statuses} = req.body;
    try {
        let user = await new UserService().updateUserStatus(id, statuses);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const updateUserLoyaltyRole = async (req: Request, res: Response) => {
    try {
        let {id, loyal_role_id} = req.body;
        let updatedUserLoyaltyRole = await new UserService().updateUserLoyaltyRole(id, loyal_role_id);
        ResponseHelper.sendResponse(res, 'Inserted successfully', updatedUserLoyaltyRole)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const refreshTokens = async (req: Request, res: Response) => {
    try {
        const refresh_token = req.headers.authorization;
        if (!refresh_token) {
            throw new ErrorService(403, 'Token not found');
        }
        const userData = await new UserService().refresh(refresh_token);
        ResponseHelper.sendResponse(res, 'Refresh successfully', userData);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.headers.authorization;
        if (!refreshToken) {
            throw new ErrorService(403, 'Token not found');
        }
        await new UserService().logout(refreshToken);
        ResponseHelper.sendResponse(res, 'Logout successfully');
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}
