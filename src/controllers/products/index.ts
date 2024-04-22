import {ResponseHelper} from "../../helpers/response";
import {Request, Response} from "express";
import {ProductService} from "../../services/product.service";
import {getProductsByFiltersOrAll} from "../../utils/product.template";
import {ProductRepository} from "../../repositories";

export const getAllOrFiltersProducts = async (req: Request, res: Response) => {
    try {
        let data = req.query;
        let products = await getProductsByFiltersOrAll(data.categoryName as string ?? '')
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


export const addToCart = async (req: Request, res: Response) => {
    try {
        let {id} = req.body;
        let user_id = req.body.user.id;
        let cartProduct = await new ProductService().addToCart(id, user_id);
        ResponseHelper.sendResponse(res, 'Inserted successfully', cartProduct)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const removeFromCart = async (req: Request, res: Response) => {
    try {
        let id = req.params.id
        let cartProduct = await new ProductService().removeFromCart(Number(id))
        ResponseHelper.sendResponse(res, 'Inserted successfully', cartProduct)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getAllProductsInCart = async (req: Request, res: Response) => {
    try {
        let id = req.params.id
        let allCartProducts = await new ProductRepository().getAllProductsInCart(Number(id))
        ResponseHelper.sendResponse(res, 'Inserted successfully', allCartProducts)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const addProductToFavorite = async (req: Request, res: Response) => {
    try {
        let product_id = req.params.id
        let user_id = req.body.user.id;
        await new ProductService().addProductToFavorite(user_id, Number(product_id))
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const removeProductFromFavoriteList = async (req: Request, res: Response) => {
    try {
        let product_id = req.params.id
        let user_id = req.body.user.id;
        await new ProductService().removeProductFromFavoriteList(user_id, Number(product_id))
        ResponseHelper.sendResponse(res, 'Inserted successfully')
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}

export const getAllProductsFromFavoriteList = async (req: Request, res: Response) => {
    try {
        let user_id = req.query.id;
        let favorites_products = await new ProductService().getAllProductsFromFavoriteList(Number(user_id))
        ResponseHelper.sendResponse(res, 'Inserted successfully', favorites_products)
    } catch (exception: any) {
        ResponseHelper.sendError(res, exception.message, exception.statusCode, exception)
    }
}
