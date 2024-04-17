import {ErrorService, TokenService} from "../../services";
import {ResponseHelper} from "../../helpers/response";
import {Request, Response} from "express";

export const checkAccessUsersMiddleware = async (req: Request, res: Response, next: any) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new ErrorService(500, 'Authorized token is empty');
        }

        const userData = await new TokenService().validateAccessToken(authorizationHeader.split(' ')[1]);

        if (!userData) {
            throw new ErrorService(401, 'User not authorized');
        }

        // @ts-ignore
        req.body.user = userData;
        next();

    } catch (exception: any) {
        return ResponseHelper.sendError(res, exception.message, exception.statusCode, exception);
    }
}
