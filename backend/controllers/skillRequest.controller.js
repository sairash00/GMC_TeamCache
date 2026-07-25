import SkillRequest from "../models/skillRequest.model.js";

import CatchAsync from "../utils/CatchAsync.js";
import ApiError from "../utils/ApiError.js";
import sendResponse from "../utils/ApiResponse.js"; 

// Create Skill Request checked

export const createSkillRequest = CatchAsync(async (req, res) => {
  const { title, description } = req.body;

  const skillRequest = await SkillRequest.create({
    title,
    description,
    requestedBy: req.user._id,
  });

  return sendResponse(
    res,
    201,
    "Skill request created successfully.",
    skillRequest,
  );
});

// Get All Skill checked

export const getAllSkillRequests = CatchAsync(async (req, res) => {
  const requests = await SkillRequest.find()
    .populate("requestedBy", "name avatar")
    .sort({
      createdAt: -1,
    });

  return sendResponse(
    res,
    200,
    "Skill requests fetched successfully.",
    requests,
  );
});

// Upvote Skill Request checked

// Upvote Skill Request

export const upvoteSkillRequest = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const request = await SkillRequest.findById(id);

  if (!request) {
    throw new ApiError(404, "Skill request not found.");
  }

  const alreadyUpvoted = request.upvotedBy.some(
    (userId) => userId.toString() === req.user._id.toString()
  );

  const alreadyDownvoted = request.downvotedBy.some(
    (userId) => userId.toString() === req.user._id.toString()
  );


  if (alreadyUpvoted) {
    throw new ApiError(
      409,
      "You have already upvoted this skill request."
    );
  }


  if (alreadyDownvoted) {
    throw new ApiError(
      409,
      "You have already downvoted this skill request. You cannot upvote again."
    );
  }


  request.upvotes += 1;

  request.upvotedBy.push(req.user._id);

  await request.save();


  return sendResponse(
    res,
    200,
    "Skill request upvoted successfully.",
    request
  );
});


// Downvote Skill Request

export const downvoteSkillRequest = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const request = await SkillRequest.findById(id);

  if (!request) {
    throw new ApiError(404, "Skill request not found.");
  }


  const alreadyUpvoted = request.upvotedBy.some(
    (userId) => userId.toString() === req.user._id.toString()
  );


  const alreadyDownvoted = request.downvotedBy.some(
    (userId) => userId.toString() === req.user._id.toString()
  );


  if (alreadyDownvoted) {
    throw new ApiError(
      409,
      "You have already downvoted this skill request."
    );
  }


  if (alreadyUpvoted) {
    throw new ApiError(
      409,
      "You have already upvoted this skill request. You cannot downvote again."
    );
  }


  request.downvotes += 1;

  request.downvotedBy.push(req.user._id);


  await request.save();


  return sendResponse(
    res,
    200,
    "Skill request downvoted successfully.",
    request
  );
});
// Delete Skill Request checked

export const deleteSkillRequest = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const request = await SkillRequest.findById(id);

  if (!request) {
    throw new ApiError(404, "Skill request not found.");
  }

  if (request.requestedBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this request.");
  }

  await request.deleteOne();

  return sendResponse(res, 200, true, "Skill request deleted successfully.");
});
