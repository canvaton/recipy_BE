import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRouter from "./routes/userRouter";
import recipeRouter from "./routes/recipeRouter";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./models/schema";
import { Pool } from "pg";

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.use(morgan("combined"));

server.get("/api", (req, res) => {
	res.send("Welcome to :^) Recipify API");
});

// ! Auth Middleware here
server.use("/api/user", userRouter);
server.use("api/recipe", recipeRouter);

// Set pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool, { schema });

const startServer = async () => {
	try {
		await pool.connect()
    console.log(`${new Date().toLocaleString()} + Connected to Database`);
		server.listen(port, () => {
			console.log(`Server running in ${port}`);
		});
	} catch (error) {
		console.log(error);
	}
}

startServer()

export { db };
