 import { Sequelize} from "sequelize";

 const db = new Sequelize('Movie_crud','root','',{
    host:"localhost",
    dialect: "mysql"
 });
 export default db;