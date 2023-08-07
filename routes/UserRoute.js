import express from "express";
import {  getUsers, Register, Login, Logout  } from "../controllers/Users.js";
import {  deleteUser,updateUser,createUser  } from "../controllers/Crudusers.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const userRoute = express.Router();

userRoute.get('/users', verifyToken, getUsers);
userRoute.post('/users', Register);
userRoute.post('/login', Login);
userRoute.delete('/logout', Logout);
userRoute.get('/token', refreshToken);

//crud
userRoute.delete('/users/:id', deleteUser);
userRoute.patch('/users/:id', updateUser);
userRoute.post('/users', createUser);



export default userRoute;