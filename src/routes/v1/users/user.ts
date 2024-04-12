import {createUser} from "../../../controllers/users";

const express = require("express");
const accountRouter = express.Router();

accountRouter.post('/users/create', createUser)

export {accountRouter} ;
