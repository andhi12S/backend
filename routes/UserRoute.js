import express from "express";
import {  getUsers, Register, Login, Logout, createUser, deleteUser, updateUser} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const userRoute = express.Router();

userRoute.get('/users', verifyToken, getUsers);
userRoute.post('/users', Register);
userRoute.post('/login', Login);
userRoute.delete('/logout', Logout);
userRoute.get('/token', refreshToken);
userRoute.delete('/users/:id', deleteUser);
userRoute.patch('/users/:id', updateUser);
userRoute.post('/users', createUser);



export default userRoute;