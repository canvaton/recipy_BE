import { text, pgTable, uuid, integer, numeric } from "drizzle-orm/pg-core";

// * MAIN TABLES
export const user = pgTable("user", {
	id: uuid("id").primaryKey().defaultRandom(),
	username: text("username").notNull(),
	nickname: text("nickname"),
	pfp: text("pfp"),
});

export const recipe = pgTable("recipe", {
	id: uuid("id").primaryKey().defaultRandom(),
	description: text("description").notNull(),
	diet: text("diet"),
	servings: integer("servings"),
	calories: numeric("calories"),
	link: text("link"),
});

export const group = pgTable("group", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	image: text("image"),
	description: text("description"),
});

// * RELATIONAL TABLES
export const groupMembers = pgTable("groupMembers", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	groupId: uuid("groupId")
		.notNull()
		.references(() => group.id, { onDelete: "cascade" }),
	role: text("role").notNull(),
});

export const userRecipes = pgTable("userRecipes", {
	id: uuid("id").primaryKey().defaultRandom(),
	recipeId: uuid("recipeId")
		.notNull()
		.references(() => recipe.id, { onDelete: "cascade" }),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
	groupId: uuid("groupId").references(() => group.id, { onDelete: "cascade" }),
});

export const recipeAllergies = pgTable("recipeAllergies", {
	id: uuid("id").primaryKey().defaultRandom(),
	recipeId: uuid("recipeId")
		.notNull()
		.references(() => recipe.id, { onDelete: "cascade" }),
	allergy: text("allergy").notNull(),
});
