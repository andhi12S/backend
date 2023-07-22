    import express from "express";
    import { getUsers, createUsers, deleteUsers , updateUsers} from "../controllers/Users.js";

    const router = express.Router();

    router.get('/users', getUsers);
    router.post('/users', createUsers);
    router.delete('/users/:id', deleteUsers);
    router.patch('/users/:id', updateUsers);
    export default router;