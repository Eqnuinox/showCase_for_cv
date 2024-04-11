import {getAllProducts} from "../../../controllers/products";

const express = require("express");
const productRouter = express.Router();

productRouter.get('/products/all', getAllProducts)

export {productRouter} ;
