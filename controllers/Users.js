import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.status(200).json({
            status: 200,
            message: "succes",
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async (req,res)=>{
    try{
        const { name,password, email} = req.body
        const userDataCreated = await Users.create({
            name,
            email,
            password

        })
        res.status(201).json({
            status: 201,
            message: "Succes!",
            data: userDataCreated
        })

    }catch(error){
        console.log(error)
        res.status(400).json({
            message: "Bad request!",
            errors: error
        })
    }
}

export const deleteUser = async (req,res)=>{
    try{
        const idUser = req.params.id
        const checkUser = await Users.findOne({
            where:{
                id: idUser
            }
        })
        console.log(checkUser);
        if(!checkUser){
            return res.status(400).json({
                status: 404,
                message: "not found",
            })
                }
            await Users.destroy({
                where:{
                id: idUser
                }
                
            });
            res.status(200).json({
                status: 200,
                message: "succes!",
            })
    } catch(error){

    }
}

export const updateUser = async (req,res)=>{
    try {
        const { name,email, password} = req.body
        const idUser = req.params.id
        const checkUser = await Users.findOne({
            where:{
                id:idUser
            }
        })
        if(!checkUser){
            return res.status(400).json({
                status: 404,
                message: "not found",
            })
                }
            checkUser.update({
                name,
                email,
                password
            })
            res.status(200).json({
                status:200,
                message: "succes",
                data: checkUser
            })

        
    } catch (error) {
        
    }
    }

export const Register = async(req, res)=>{
    const { name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg:"password dan confirm password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "register berhasil!"});

    } catch (error) {
        console.log(error);
        
    }

}

export const Login = async(req, res)=>{
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email                   
            }
        });
        const pass = await bcrypt.compare(req.body.password, user[0].password);
        if(!pass) return res.status(400).json({msg:"wrong password"});
        const userId = user[0].id;
        const name   = user[0].name;
        const email  = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'    
        });
        const refreshToken = jwt.sign({userId, name, email},process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
         await Users.update({refresh_Token: refreshToken},{
            where:{
                id:userId
            }
        });
         res.cookie('refreshToken', refreshToken,{
            httpOnly: true, 
            maxAge:24 * 60 * 60 * 1000
                    
        });
         res.json({ accessToken }); 

    } catch (error) {
        res.status(404).json({msg:"Email Tidak Ditemukan!"});
        
    }
}

export const Logout = async(req, res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
    where:{
        refresh_token: refreshToken
    }
});
if(!user[0]) return res.sendStatus(204);
const userId = user[0].id;
await Users.update({refresh_Token: null},{
    where:{
        id: userId
    }
});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);

}