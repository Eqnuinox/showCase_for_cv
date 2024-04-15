import {
    createProduct,
    deleteProduct,
    getAllOrFiltersProducts,
    getProductById,
    updateProduct
} from "../../../controllers/products";
import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";

const express = require("express");
const productRouter = express.Router();

productRouter.get('/products/', checkAccessUsersMiddleware ,getAllOrFiltersProducts)
productRouter.post('/products/create', checkAccessUsersMiddleware, createProduct)
productRouter.delete('/products/:id/delete', checkAccessUsersMiddleware, deleteProduct)
productRouter.get('/products/:id', checkAccessUsersMiddleware, getProductById)
productRouter.patch('/products/update', checkAccessUsersMiddleware, updateProduct)

export {productRouter} ;
