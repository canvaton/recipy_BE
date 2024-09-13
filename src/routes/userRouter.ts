import express from "express";
import userControllers from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	res.status(200).send("Hello from users");
});

userRouter.post('/', userControllers.addUser)
userRouter.delete('/', userControllers.deleteUser)

export default userRouter;
