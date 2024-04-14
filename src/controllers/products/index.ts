import {ResponseHelper} from "../../helpers/response";
import {Request, Response} from "express";
import {ProductService} from "../../services/product.service";
import {getProductsByFiltersOrAll} from "../../utils/product.template";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        // let allProducts = await new ProductService().getAllProducts();
        const data = req.query;
        // @ts-ignore
        let products =  await getProductsByFiltersOrAll(data.categoryName ?? '')
        ResponseHelper.sendResponse(res, 'Inserted successfully', products)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        let data = req.body;
        let product = await new ProductService().createProduct(data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', product)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
export const getProductById = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        let product = await new ProductService().getProductById(Number(id));
        ResponseHelper.sendResponse(res, 'Inserted successfully', product)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await new ProductService().deleteProduct(Number(id));
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}


export const updateProduct = async (req: Request, res: Response) => {
    try {
        let {id, data} = req.body;
        let product = await new ProductService().updateProduct(id, data);
        ResponseHelper.sendResponse(res, 'Inserted successfully', product)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
