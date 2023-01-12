/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
import express from "express";
import morgan from "morgan";
import rateLimiter from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import cors from "cors";
// eslint-disable-next-line import/extensions
import voterRouter from "./routes/voterRoutes.js";
// eslint-disable-next-line import/extensions
import proposeRouter from "./routes/proposeRoutes.js";
// eslint-disable-next-line import/extensions
import globalErrorHandler from "./controllers/globalErrorHandler.js";
// eslint-disable-next-line import/extensions
import rentalRouter from "./routes/propertyRoutes.js";

const app = express();

const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
});

app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(hpp());

app.use(cors());
app.options("*", cors());

app.use("/api/propose", proposeRouter);
app.use("/api/vote", voterRouter);
app.use("/api/property/", rentalRouter);

// if no route hit till this point
// eslint-disable-next-line no-unused-vars
app.all("*", (req, res, next) => {
	res.status(204).json({
		status: "Not a valid path",
		result: "Server is running",
	});
});

// global error handler
app.use(globalErrorHandler);

export default app;
