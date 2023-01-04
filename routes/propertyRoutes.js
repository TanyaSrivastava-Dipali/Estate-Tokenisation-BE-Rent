import express from "express";
// eslint-disable-next-line import/extensions
import * as PropertyController from "../controllers/PropertyController.js";

const Router = express.Router();

Router.route("/CreateProperty").post(PropertyController.createNewProperty);
Router.route("/changeListingStatus/:propertyTokenId").patch(PropertyController.changeListingStatus);
Router.route("/getPropertystatus/:propertyTokenId").get(PropertyController.getPropertystatus);
Router.route("/getAllPropertystatus").get(PropertyController.getAllPropertystatus);
export default Router;
