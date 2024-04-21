import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {createInvoice, getAllInvoices} from "../../../controllers/invoices";
import {checkAdminStatusMiddleware} from "../../../middlewares/auth/checkStatusUsers.middleware";


const express = require("express");
const invoiceRouter = express.Router();

invoiceRouter.post('/invoices/create', checkAccessUsersMiddleware, createInvoice);
invoiceRouter.get('/invoices/all', checkAccessUsersMiddleware, checkAdminStatusMiddleware, getAllInvoices);


export {invoiceRouter};
