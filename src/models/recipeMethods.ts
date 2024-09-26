import { db } from "../server";
import type { RecipeType } from "../types";
import { RecipeSchema } from "../types";
import { recipe } from "./schema";

class RecipeMethods {
	async insertRecipe(link: string): Promise<RecipeType | null> {
		try {
			let url: string | undefined;
			if (link.includes("www.instagram.com")) {
				url = process.env.INSTAGRAM_URL;
			} else if (link.includes("www.youtube.com")) {
				url = process.env.YOUTUBE_URL;
			} else if (link.includes("www.tiktok.com")) {
				url = process.env.TIKTOK_URL;
			} else {
				url = process.env.GENERAL_URL;
			}

			if (!url) {
				console.error("No URL specified in the .env");
			}

			const response = await fetch(url as string, {
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				console.error(`HTTP error! status: ${response.status}`);
			}

			const recipeData = response.json();
			const validatedRecipe = RecipeSchema.parse(recipeData);
			const createdRecipe = await db
				.insert(recipe)
				.values(validatedRecipe)
				.returning();

			return createdRecipe[0];
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default new RecipeMethods();
