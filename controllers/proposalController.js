import ProposalModel from "../model/proposalModel.js";
import catchAsync from "../utils/catchAsync.js";
import { filterObj } from "../utils/helper.js";

const addNewProposal = catchAsync(async (req, res, next) => {
  const newBody = filterObj(
    req.body,
    "onChainProposalId",
    "proposalProofLink",
    "withDrawFundsFrom",
    "amount"
  );
  if (
    !newBody.onChainProposalId ||
    !newBody.proposalProofLink ||
    !newBody.amount ||
    !newBody.withDrawFundsFrom
  ) {
    return next(
      "onChainProposalId,ProposalProofLink,amount,withDrawFundsFrom are required to create a new proposal"
    );
  }
  const proposal = await ProposalModel.create(newBody);
  res.status(201).json({
    status: "success",
    data: proposal,
  });
});

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

const getAllProposal = catchAsync(async (req, res, next) => {
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
