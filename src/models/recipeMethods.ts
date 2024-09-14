import { RecipeSchema, type RecipeType } from "../types";

class RecipeMethods {
	async addRecipe(link: string): Promise<RecipeType | null> {
		try {
			if (!process.env.LLM_SERVICE) return null;
			const response = await fetch(process.env.LLM_SERVICE, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
      
			const recipe = RecipeSchema.parse(response.json());

			return recipe || null;
		} catch (error) {
			console.log(error);
			throw new Error("Failed to create recipe!");
		}
	}
}

export default new RecipeMethods();
