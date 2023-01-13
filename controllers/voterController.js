/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { Network, Alchemy } from "alchemy-sdk";
import dotenv from "dotenv";
import catchAsync from "../utils/catchAsync.js";
import ProposalModel from "../models/proposalModel.js";
import votingModel from "../models/votingModel.js";
import MogulDAOMarkleTree from "../utils/markleTree.js";
import { filterObj } from "../utils/helper.js";

dotenv.config({ path: "../.env" });

const getVotersDetails = catchAsync(async (req, res, next) => {
	// alchemy settings
	const settings = {
		apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
		network: Network.MATIC_MUMBAI, // Replace with your network.
	};
	const alchemy = new Alchemy(settings);

	// filter the req.body data
	const newBody = filterObj(req.query, "tokenId", "target", "owner");

	if (!newBody.target) {
		return next("target is required");
	}
	if (
		(newBody.target === "voterAddresses" || newBody.target === "voterRootHash") &&
		!newBody.tokenId
	) {
		return next("tokenId is required");
	}
	if (newBody.target === "voterProof" && !newBody.tokenId && !newBody.owner) {
		return next("tokenId , owner is required");
	}
	const { owners } = await alchemy.nft.getOwnersForNft(
		process.env.PROPERTY_TOKEN_ADDRESS,
		newBody.tokenId
	);

	// const owners = [
	// 	"0x271a102ab92f9584f3a83db17f3d766e1719ee3e",
	// 	"0x2c2349ba934b4d50cd9c1335d7009b92bf8e4661",
	// ];
	//   console.log(req.body);
	const merkleTree = new MogulDAOMarkleTree(owners);
	let result;
	if (newBody.target === "voterAddresses") {
		result = {
			length: owners.length,
			data: owners,
		};
	}
	if (newBody.target === "voterRootHash") {
		result = {
			data: merkleTree.getOwnersRootHash(),
		};
	}
	if (newBody.target === "voterProof") {
		if (!newBody.owner) {
			return next("owner Address is required to fetch merkle proof");
		}
		result = { data: merkleTree.getOwnerProof(newBody.owner) };
	}
	res.status(200).json({
		status: "success",
		result,
	});
});

const addVote = catchAsync(async (req, res, next) => {
	// filter the req.body data
	const newBody = filterObj(req.body, "proposalId", "castVote", "voterAddress");

	if (!newBody.proposalId || !newBody.castVote || !newBody.voterAddress) {
		return next("proposalId,castVote,voterAddress are required to add a new vote");
	}

	const proposal = await ProposalModel.findById(newBody.proposalId);
	if (!proposal) {
		return next("Proposal doesn't exist");
	}

	const vote = await votingModel.create(newBody);
	res.status(201).json({
		status: "success",
		data: vote,
	});
});

export { getVotersDetails, addVote };
