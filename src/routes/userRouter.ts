import express from "express";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
	res.status(200).send("Hello from users");
});

export default userRouter;
