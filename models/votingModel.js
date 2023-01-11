import mongoose from "mongoose";

const votingSchema = new mongoose.Schema({
	proposalId: {
		type: mongoose.Schema.ObjectId,
		ref: "Proposal",
		required: [true, "A proposal is required"],
	},
	castVote: {
		type: String,
		enum: ["0", "1", "2"],
		required: [true, "voting is required"],
	},
	voterAddress: {
		type: String,
		required: [true, "voter address is required"],
	},
	votedAt: {
		type: Date,
		default: Date.now(),
	},
});

const votingModel = mongoose.model("vote", votingSchema);
export default votingModel;
