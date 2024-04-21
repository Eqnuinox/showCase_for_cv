import {Request, Response} from "express";
import {ResponseHelper} from "../../helpers/response";
import {InvoiceService} from "../../services";

export const createInvoice = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let user_id = data.user.id
        let invoice = await new InvoiceService().createInvoice(Number(user_id));
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoice);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}


export const getAllInvoices = async (req: Request, res: Response) => {
    try {
        let {id} = req.query;
        let invoices = await new InvoiceService().getAllInvoices(Number(id) ?? '');
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoices);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getInvoiceById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let invoice = await new InvoiceService().getInvoiceById(Number(id));
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoice);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const updateInvoice = async (req: Request, res: Response) => {
    try {
        let {id, data} = req.body;
        let user_id = req.body.user.id;
        let invoice = await new InvoiceService().updateInvoice(id, data, Number(user_id));
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoice);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
