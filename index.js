import express from "express";
import db from "./config/Database.js";
import userRoute from "./routes/UserRoute.js";
const app = express();

try {
    await db.authenticate();
    await db.sync()
    console.log('Database connected...');
} catch (error) {
    console.error(error);
}

app.use(express.json());
app.use(userRoute);


app.listen(5000, () => console.log('server running at port 5000'));
