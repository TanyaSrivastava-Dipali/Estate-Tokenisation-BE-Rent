import mongoose from "mongoose";

const proposalSchema = new mongoose.Schema({
	proposalIdHash: {
		type: String,
		unique: true,
		required: [true, "Proposal Id is required"],
	},
	ownerListAtProposal: {
		type: [String],
		required: [true, "Owner list is required"],
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
