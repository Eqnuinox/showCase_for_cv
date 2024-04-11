import {getAllUsers} from "../../../controllers/users";

const express = require("express");
const accountRouter = express.Router();

accountRouter.get('/users/all', getAllUsers)

export {accountRouter} ;
