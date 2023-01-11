import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
	onChainProposalId: {
		type: String,
		unique: true,
		required: [true, "Proposal Id is required"],
	},
	proposalProofLink: {
		type: String,
		required: [true, "Proposal proof is required"],
	},
	withDrawFundsFrom: {
		type: String,
		required: [true, "WithDrawFundsFrom is required"],
	},
	amount: {
		type: String,
		required: [true, "Proposal amount is required"],
	},
	isExecuted: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	executedAt: {
		type: Date,
	},
});

const ProposalModel = mongoose.model("Proposal", proposalSchema);
export default ProposalModel;
