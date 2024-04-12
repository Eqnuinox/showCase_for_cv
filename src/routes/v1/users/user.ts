import {createUser, deleteUser, updateUser} from "../../../controllers/users";

const express = require("express");
const accountRouter = express.Router();

accountRouter.post('/users/create', createUser)
accountRouter.patch('/users/update', updateUser)
accountRouter.delete('/users/:id/delete', deleteUser)

export {accountRouter} ;
