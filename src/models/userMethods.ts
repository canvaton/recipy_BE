import { db } from "../server";
import { user } from "./schema";
import type { UserType } from "../types";
import { eq } from "drizzle-orm";

class UserMethods {
	async insertUser(username: string): Promise<UserType | null> {
		try {
			const createdUser = await db
				.insert(user)
				.values({
					username: username,
				})
				.returning()
				.then((user) => user[0]);
			return createdUser;
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async deleteUser(userId: string): Promise<UserType | null> {
		try {
			const deletedUser = await db
				.delete(user)
				.where(eq(user.id, userId))
				.returning()
				.then((user) => user[0]);
			return deletedUser;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export default new UserMethods();
