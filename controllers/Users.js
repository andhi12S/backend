import Users from "../models/UserModel.js";

 export const getUsers = async(req, res) =>{
    try {
        const users = await Users.findAll();
        res.status(200).json({
            status: 200,
            message:"succes",
            data: users
        });
    } catch (error){
        console.log(error);
    }
}
