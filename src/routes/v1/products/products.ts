import {
    addProductToFavorite,
    addToCart,
    createProduct,
    deleteProduct,
    getAllOrFiltersProducts, getAllProductsFromFavoriteList,
    getAllProductsInCart,
    getProductById,
    removeFromCart,
    removeProductFromFavoriteList,
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
productRouter.post('/products/in-favorite-list/:id', checkAccessUsersMiddleware, addProductToFavorite)
productRouter.delete('/products/:id/remove-favorite-list', checkAccessUsersMiddleware, removeProductFromFavoriteList)
productRouter.get('/products/favorite/all', checkAccessUsersMiddleware, getAllProductsFromFavoriteList)


export {productRouter} ;
