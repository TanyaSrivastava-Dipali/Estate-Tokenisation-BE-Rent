import express from "express";
import {
	addNewProposal,
	getAllProposal,
	executeProposal,
	// eslint-disable-next-line import/extensions
} from "../controllers/proposalController.js";

const proposeRouter = express.Router();

proposeRouter.get("/allProposals", getAllProposal);
proposeRouter.post("/add", addNewProposal);
proposeRouter.post("/execute", executeProposal);

export default proposeRouter;
