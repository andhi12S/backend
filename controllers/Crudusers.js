import Users from "../models/UserModel.js";

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
            message: "Succes!",
            data: userDataCreated
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
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
        console.log(checkUser);
        if (!checkUser) {
            return res.status(400).json({
                status: 404,
                message: "not found",
            })
        }
        await Users.destroy({
            where: {
                id: idUser
            }

        });
        res.status(200).json({
            status: 200,
            message: "succes!",
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
            status: 200,
            message: "succes",
            data: checkUser
        })


    } catch (error) {

    }
}