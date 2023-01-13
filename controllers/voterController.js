/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import { Network, Alchemy } from "alchemy-sdk";
import keccak256 from "keccak256";
import dotenv from "dotenv";
import catchAsync from "../utils/catchAsync.js";
import ProposalModel from "../models/proposalModel.js";
import votingModel from "../models/votingModel.js";
import MogulDAOMarkleTree from "../utils/markleTree.js";
import { filterObj } from "../utils/helper.js";

dotenv.config({ path: "../.env" });

const getVotersDetails = catchAsync(async (req, res, next) => {
	// filter the req.body data
	const newBody = filterObj(req.query, "tokenId", "target", "owner", "onChainProposalId");

	if (!newBody.target) {
		return next("target is required");
	}
	if (
		(newBody.target === "voterRootHash" || newBody.target === "ownerAddresses") &&
		!newBody.tokenId
	) {
		return next("tokenId is required");
	}
	if (
		newBody.target === "voterProof" &&
		!newBody.tokenId &&
		!newBody.owner &&
		!newBody.onChainProposalId
	) {
		return next("tokenId ,onChainProposalId, owner is required");
	}

	let result;
	if (newBody.target === "ownerAddresses") {
		// alchemy settings
		const settings = {
			apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
			network: Network.MATIC_MUMBAI, // Replace with your network.
		};
		const alchemy = new Alchemy(settings);
		const { owners } = await alchemy.nft.getOwnersForNft(
			process.env.PROPERTY_TOKEN_ADDRESS,
			newBody.tokenId
		);
		result = {
			length: owners.length,
			data: owners,
		};
	}
	if (newBody.target === "voterRootHash") {
		// alchemy settings
		const settings = {
			apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
			network: Network.MATIC_MUMBAI, // Replace with your network.
		};
		const alchemy = new Alchemy(settings);
		const { owners } = await alchemy.nft.getOwnersForNft(
			process.env.PROPERTY_TOKEN_ADDRESS,
			newBody.tokenId
		);

		let merkleTree = new MogulDAOMarkleTree(owners);
		result = {
			data: merkleTree.getOwnersRootHash(),
		};
	}
	if (newBody.target === "voterProof") {
		const proposalIdHash = keccak256(
			newBody.tokenId.toString() + newBody.onChainProposalId.toString()
		).toString("hex");
		const proposalDetails = await ProposalModel.findOne({ proposalIdHash });
		const owners = proposalDetails.ownerListAtProposal;

		let merkleTree = new MogulDAOMarkleTree(owners);
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
