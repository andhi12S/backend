import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import userRoute from "./routes/UserRoute.js";
dotenv.config();
const app = express();
try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error(error);
}
app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(userRoute);

app.listen(5000, () => console.log('server running at port 5000'));