import { z } from "zod";

export const UserSchema = z.object({
	id: z.string().uuid(),
	username: z.string().min(6),
	nickname: z.string().optional().nullable(),
	pfp: z.string().optional().nullable(),
});

export const GroupSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	image: z.string().optional().nullable(),
	description: z.string().optional().nullable(),
});

export const RecipeSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	description: z.string(),
	preparationSteps : z.array(z.string()),
	diet: z.string().optional().nullable(),
	servings: z.number().optional().nullable(),
	calories: z.number().optional().nullable(),
	link: z.string(),
	allergies: z.string(),
});

export const GroupMembersSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	groupId: z.string().uuid(),
});

export const UserRecipeSchema = z
	.object({
		id: z.string().uuid(),
		recipeId: z.string().uuid(),
		userId: z.string().uuid().optional().nullable(),
		groupId: z.string().uuid().optional().nullable(),
	})
	.refine((data) => data.userId != null || data.groupId != null, {
		message: "Either userId or groupId must have a value",
		path: ["userId", "groupId"],
	}); // To check if at least one of the fields is filled



export type UserType = z.infer<typeof UserSchema>;
export type RecipeType = z.infer<typeof RecipeSchema>;
export type GroupType = z.infer<typeof GroupSchema>;
export type GroupMembersType = z.infer<typeof GroupMembersSchema>;
export type UserRecipeType = z.infer<typeof UserRecipeSchema>;
