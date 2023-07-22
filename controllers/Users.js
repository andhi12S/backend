import Users from "../models/UserModel.js";



export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.status(200).json({
            status: 200,
            message: "succes",
            data: users
        });
    } catch (error) {
        console.log(error);
    }
}


export const createUser = async (req, res) => {
    try {
        const { name, password, email } = req.body
        const userDataCreated = await Users.create({
            name,
            email,
            password
        })
        res.status(201).json({
            status: 201,
            message: "Success!",
            data: userDataCreated
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: 400,
            message: "Bad request!",
            errors: error
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const idUser = req.params.id
        const checkUser = await Users.findOne({
            where: {
                id: idUser
            }
        })
        if (!checkUser) {
            return res.status(400).json({
                status: 404,
                message: "Not found!",
            })
        }
        checkUser.destroy()
        res.status(200).json({
            status: 200,
            message: "Success!",
        })


    } catch (error) {

    }
}



export const updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const idUser = req.params.id
        const checkUser = await Users.findOne({
            where: {
                id: idUser
            }
        })
        if (!checkUser) {
            return res.status(404).json({
                status: 404,
                message: "Not found!",
            })
        }
        checkUser.update({
            name,
            email,
            password
        })

        res.status(200).json({
            status: 200,
            message: "Success!",
            data: checkUser
        })
    } catch (error) {

    }
}