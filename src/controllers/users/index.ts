import {ResponseHelper} from "../../helpers/response";
import {UserService} from "../../services/user.service";
import {Request, Response} from "express";

export const createUser = async (req: Request, res: Response) => {
    try {
        let user = await new UserService().createAccount();
        ResponseHelper.sendResponse(res, 'Inserted successfully', user);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}

