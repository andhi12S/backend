import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
const app = express();

try{
    await db.authenticate();
    await db.sync();
    console.log('Database connected...');
} catch (error){
    console.error(error);
}

app.use(express.json());
app.use(router);


app.listen(5000,()=>console.log('server running at port 5000'));
