import express from "express";
import recipeControllers from "../controllers/recipeControllers";

const recipeRouter = express.Router();

recipeRouter.get("/", (req, res) => {
	res.status(200).send("Hello from recipes");
});

recipeRouter.post("/", recipeControllers.addRecipe);

export default recipeRouter;
