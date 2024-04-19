import {
    addToCart,
    createProduct,
    deleteProduct,
    getAllOrFiltersProducts,
    getAllProductsInCart,
    getProductById,
    removeFromCart,
    updateProduct
} from "../../../controllers/products";
import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {checkAdminStatusMiddleware} from "../../../middlewares/auth/checkStatusUsers.middleware";

const express = require("express");
const productRouter = express.Router();

productRouter.get('/products/', getAllOrFiltersProducts)
productRouter.post('/products/create', checkAccessUsersMiddleware, checkAdminStatusMiddleware, createProduct)
productRouter.delete('/products/:id/delete', checkAccessUsersMiddleware, checkAdminStatusMiddleware, deleteProduct)
productRouter.get('/products/:id', checkAccessUsersMiddleware, getProductById)
productRouter.patch('/products/update', checkAccessUsersMiddleware, checkAdminStatusMiddleware, updateProduct)
productRouter.post('/products/add-to-cart', checkAccessUsersMiddleware, addToCart)
productRouter.delete('/products/:id/remove-from-cart', checkAccessUsersMiddleware, removeFromCart)
productRouter.get('/products/in-cart/:id', checkAccessUsersMiddleware, getAllProductsInCart)


export {productRouter} ;
