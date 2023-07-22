import express from "express";
import { createUser, getUsers, deleteUser, updateUser } from "../controllers/Users.js";

const userRoute = express.Router();

userRoute.get('/users', getUsers);
userRoute.delete('/users/:id', deleteUser);
userRoute.patch('/users/:id', updateUser);
userRoute.post('/users', createUser);



export default userRoute;