import express from "express";
// eslint-disable-next-line import/extensions
import * as PropertyController from "../controllers/PropertyController.js";

const rentalRouter = express.Router();

rentalRouter.route("/CreateProperty").post(PropertyController.createNewProperty);
rentalRouter
	.route("/changeListingStatus/:propertyTokenId")
	.patch(PropertyController.changeListingStatus);
rentalRouter.route("/getPropertystatus/:propertyTokenId").get(PropertyController.getPropertystatus);
rentalRouter.route("/getAllPropertystatus").get(PropertyController.getAllPropertystatus);
export default rentalRouter;
