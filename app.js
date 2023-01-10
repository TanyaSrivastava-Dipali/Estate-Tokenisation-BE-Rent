import express from "express";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import rateLimiter from "express-rate-limiter";
// import cookieParser from "cookie-parser";
// import hpp from "hpp";
// import mogulRentalRoutes from "./routes/rentalRoutes.js";
import voterRouter from "./routes/voterRoutes.js";
import proposeRouter from "./routes/proposeRoutes.js";
import globalErrorHandler from "./controllers/globalErrorHandler.js";
import morgan from "morgan";
import rateLimiter from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";
// eslint-disable-next-line import/extensions
import Router from "./routes/propertyRoutes.js";

const app = express();

// const limiter = rateLimiter({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// app.use(morgan("dev"));
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(hpp());

// app.use("/api/v1/mogulRental", mogulRentalRoutes);

app.use("/api/propose", proposeRouter);
app.use("/api/vote", voterRouter);
app.use("/api/v1/property/", Router);

//if no route hit till this point
app.all("*", (req, res, next) => {
  res.status(204).json({
    status: "Not a valid path",
    result: "Server is running",
  });
});

//global error handler
app.use(globalErrorHandler);

export default app;
