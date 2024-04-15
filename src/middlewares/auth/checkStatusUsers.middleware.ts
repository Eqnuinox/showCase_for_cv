import {Request, Response} from "express";
import {ResponseHelper} from "../../helpers/response";
import {ErrorService, TokenService, UserService} from "../../services";


export const checkAdminStatusMiddleware = async (req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = req.headers.authorization;
        // @ts-ignore
        const userData = await new TokenService().validateAccessToken(authorizationHeader.split(' ')[1]);
        const user = await new UserService().getUserById(userData.id);
        if (!user){
            throw new ErrorService(404, 'User not found');
        }
        let hasAdmin = user.statuses?.some(status => status.id === 1)
        if (!hasAdmin){
            throw new ErrorService(403, 'You have no rights');
        }
        next()

    } catch (exception: any) {
        return ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}
