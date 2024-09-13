import userMethods from "../models/userMethods";
import type { Request, Response } from "express";

class UserControllers {
	addUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { username } = req.body;
			const createdUser = await userMethods.insertUser(username);
      res.status(201).send(createdUser)
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not register User");
		}
	};
	deleteUser = async (req: Request, res: Response): Promise<void> => {
		try {
			const { userId } = req.params;
			const createdUser = await userMethods.deleteUser(userId);
		} catch (err) {
			console.log(err);
			res.status(500).send("Could not delete User");
		}
	};
}

export default new UserControllers()