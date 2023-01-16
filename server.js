import dotenv from "dotenv";
import mongoose from "mongoose";
// eslint-disable-next-line import/extensions
import app from "./app.js";

process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION! Shutting down...");
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: "./.env" });

// local DB connection
// const DB = process.env.DB_LOCAL;

// cloud DB connection
const DB = process.env.DB_CLOUD;

// to suppress a warning
mongoose.set("strictQuery", false);

// connect to mongo
mongoose
	.connect(DB)
	// eslint-disable-next-line no-unused-vars
	.then((connection) => {
		console.log("DB connection is successful");
	})
	.catch((err) => {
		console.log(err);
	});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}...`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});
