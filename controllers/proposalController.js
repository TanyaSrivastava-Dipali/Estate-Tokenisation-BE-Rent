import keccak256 from "keccak256";
import { Alchemy, Network } from "alchemy-sdk";
import dotenv from "dotenv";

// eslint-disable-next-line import/extensions
import ProposalModel from "../models/proposalModel.js";
// eslint-disable-next-line import/extensions
import catchAsync from "../utils/catchAsync.js";
// eslint-disable-next-line import/extensions
import { filterObj } from "../utils/helper.js";

dotenv.config({ path: "../.env" });

// eslint-disable-next-line consistent-return
const addNewProposal = catchAsync(async (req, res, next) => {
	const newBody = filterObj(req.body, "tokenId", "onChainProposalId");
	if (newBody.tokenId === undefined || newBody.onChainProposalId === undefined) {
		return next("tokenId,onChainProposalId are required to create a new proposal");
	}
	const proposalIdHash = keccak256(
		newBody.tokenId.toString() + newBody.onChainProposalId.toString()
	);
	const settings = {
		apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
		network: Network.MATIC_MUMBAI, // Replace with your network.
	};
	const alchemy = new Alchemy(settings);
	const { owners } = await alchemy.nft.getOwnersForNft(
		process.env.PROPERTY_TOKEN_ADDRESS,
		newBody.tokenId
	);
	// eslint-disable-next-line dot-notation
	newBody["proposalIdHash"] = proposalIdHash.toString("hex");
	// eslint-disable-next-line dot-notation
	newBody["ownerListAtProposal"] = owners;
	const proposal = await ProposalModel.create(newBody);
	res.status(201).json({
		status: "success",
		data: proposal,
	});
});

// eslint-disable-next-line consistent-return
const executeProposal = catchAsync(async (req, res, next) => {
	const newBody = filterObj(req.body, "proposalId");
	if (!newBody.proposalId) {
		return next("ProposalId is required");
	}
	const proposal = await ProposalModel.findById(newBody.proposalId);
	if (!proposal) {
		return next("Proposal doesn't exist");
	}
	proposal.isExecuted = true;
	proposal.executedAt = Date.now();

	await proposal.save();

	res.status(200).json({
		status: "success",
		result: {
			data: proposal,
		},
	});
});

const getAllProposal = catchAsync(async (req, res) => {
	const proposals = await ProposalModel.find();
	res.status(200).json({
		status: "success",
		result: {
			length: proposals.length,
			data: proposals,
		},
	});
});

export { addNewProposal, getAllProposal, executeProposal };
