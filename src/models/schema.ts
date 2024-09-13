import {
	text,
	timestamp,
	pgTable,
	uuid,
	integer,
	numeric,
} from "drizzle-orm/pg-core";

// * MAIN TABLES

export const user = pgTable("user", {
	id: uuid("id").primaryKey(),
	username: text("username").notNull(),
	nickname: text("nickname"),
	pfp: text("pfp"),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const recipe = pgTable("recipe", {
	id: uuid("id").primaryKey(),
	recipe: text("recipe").notNull(),
	diet: text("diet"),
	servings: integer("servings"),
	calories: numeric("calories"),
	link: text("link"),
});

export const group = pgTable("group", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	image: text("image"),
	description: text("description"),
});

// * RELATIONAL TABLES

export const groupMembers = pgTable("groupMembers", {
	id: uuid("id").primaryKey(),
	userId: uuid("userId")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	groupId: uuid("groupId")
		.notNull()
		.references(() => group.id, { onDelete: "cascade" }),
	role: text('role').notNull()
});

export const userRecipes = pgTable("userRecipes", {
	id: uuid("id").primaryKey(),
	recipeId: uuid("recipeId")
		.notNull()
		.references(() => recipe.id, { onDelete: "cascade" }),
	userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
	groupId: uuid("groupId").references(() => group.id, { onDelete: "cascade" }),
});

export const recipeAllergies = pgTable("recipeAllergies", {
	id: uuid("id").primaryKey(),
	recipeId: uuid("recipeId")
		.notNull()
		.references(() => recipe.id, { onDelete: "cascade" }),
	allergy: text("allergy").notNull(),
});
