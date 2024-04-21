import {Request, Response} from "express";
import {ResponseHelper} from "../../helpers/response";
import {InvoiceService} from "../../services";

export const createInvoice = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let invoice = await new InvoiceService().createInvoice(data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoice);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}


export const getAllInvoices = async (req: Request, res: Response) => {
    try {
        const {id} = req.query;
        let invoices = await new InvoiceService().getAllInvoices(Number(id) ?? '');
        ResponseHelper.sendResponse(res, 'Inserted successfully', invoices);
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
