import express from "express";

const rentRouter = express.Router();

rentRouter.route("/propertyStatus/:propertyTokenId").get();

rentRouter.route("/getPropertyRentDeposits/:propertyTokenId").get();

// rentRouter.route("/get")