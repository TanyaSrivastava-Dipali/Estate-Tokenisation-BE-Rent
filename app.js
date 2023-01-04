import express from "express";
import morgan from "morgan";
import rateLimiter from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";
// eslint-disable-next-line import/extensions
import Router from "./routes/propertyRoutes.js";

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

app.use("/api/v1/property/", Router);

app.all("*", (req, res) => {
	res.status(400).json({
		status: "Fail",
		message: "did not find any matching route",
	});
});

export default app;
