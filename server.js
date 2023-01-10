import mongoose from "mongoose";
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

//local DB connection
const DB = process.env.DB_LOCAL;

//connect to mongo

//to suppress a warning
mongoose.set("strictQuery", false);
dotenv.config();
mongoose
	.connect(process.env.LEDGER_DATABASE)
	// eslint-disable-next-line no-unused-vars
	.then((con) => {
		console.log("DB connection successful!");
	})
	.catch((err) => {
		console.log(`DB connection error ${err}`);
	});

mongoose
  .connect(DB)
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
