import express from "express";

const recipeRouter = express.Router();

recipeRouter.get("/", (req, res) => {
	res.status(200).send("Hello from recipes");
});

export default recipeRouter;