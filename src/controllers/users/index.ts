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

export const updateUser = async (req: Request, res: Response) => {
    try {
        let {id, data} = req.body;
        let user = await new UserService().updateAccount(id, data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', user)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const deleteUser = async (req: Request, res: Response)=> {
    try{
        const id = Number(req.params.id);
        await new UserService().deleteAccount(id);
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any){
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
