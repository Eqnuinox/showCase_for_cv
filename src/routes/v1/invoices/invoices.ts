import {checkAccessUsersMiddleware} from "../../../middlewares/auth/checkAccessUsers.middleware";
import {createInvoice, getAllInvoices, getInvoiceById, updateInvoice} from "../../../controllers/invoices";
import {checkAdminStatusMiddleware} from "../../../middlewares/auth/checkStatusUsers.middleware";


const express = require("express");
const invoiceRouter = express.Router();

invoiceRouter.post('/invoices/create', checkAccessUsersMiddleware, createInvoice);
invoiceRouter.get('/invoices/all', checkAccessUsersMiddleware, getAllInvoices);
invoiceRouter.get('/invoices/:id', checkAccessUsersMiddleware, getInvoiceById);
invoiceRouter.patch('/invoices/update', checkAccessUsersMiddleware, updateInvoice);


export {invoiceRouter};
