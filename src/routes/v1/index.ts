import {couponRouter} from "./coupons/coupons";
import { invoiceRouter } from "./invoices/invoices";
import {productRouter} from "./products";
import {accountRouter} from "./users";

/**
 * file to export other modules/default exports as one single module
 * export {default as something} from './fileInThisDirectory
 */
export {productRouter, accountRouter, couponRouter, invoiceRouter};

