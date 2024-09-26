import recipeMethods from "../models/recipeMethods";
import type { Request, Response } from "express";


class RecipeControllers {
	addRecipe = async (req: Request, res: Response): Promise<void> => {
		try {
			const { link } = req.body;
			const createdRecipe = await recipeMethods.insertRecipe(link);
			res.status(201).send(createdRecipe);
		} catch (err) {
			console.error(err);
			res.status(500).send("Could not create Recipe");
		}
	};
}

export default new RecipeControllers();
