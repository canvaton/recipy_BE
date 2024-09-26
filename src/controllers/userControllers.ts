import userMethods from "../models/userMethods";
import type { Request, Response } from "express";

class UserControllers {
	addUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username } = req.body;
			const createdUser = await userMethods.addUser(username);
      res.status(201).send(createdUser)
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not register User");
		}
	};
	deleteUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { userId } = req.params;
			const deletedUser = await userMethods.deleteUser(userId);
			res.status(204).send(`Deleted User: ${deletedUser?.username}`)
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not delete User");
		}
	};
}

export default new UserControllers()