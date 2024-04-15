import {
    createProduct,
    deleteProduct,
    getAllOrFiltersProducts,
    getProductById,
    updateProduct
} from "../../../controllers/products";

const express = require("express");
const productRouter = express.Router();

productRouter.get('/products/', getAllOrFiltersProducts)
productRouter.post('/products/create', createProduct)
productRouter.delete('/products/:id/delete', deleteProduct)
productRouter.get('/products/:id', getProductById)
productRouter.patch('/products/update', updateProduct)

export {productRouter} ;
