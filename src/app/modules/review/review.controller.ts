import type{ Request, Response } from "express";
import { Types } from "mongoose";
import Review from "./review.model.js";

//  Add Review
export const addReview = async (req: Request, res: Response) => {
  try {
    const { bookId, rating, comment } = req.body;
    const userId = req.params.id; 

    if (!bookId || !rating || !comment) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newReview = await Review.create({
      userId,
      bookId,
      rating,
      comment,
      status: "pending", // default
    });

    res.status(201).json({ success: true, data: newReview });
  } catch (err: any) {
    res.status(500).json({ success: false, message:err.message ||  "Failed to add review." });
  }
};

//  Get Approved Reviews by Book ID
export const getApprovedReviewsByBook = async (req: Request, res: Response) => {
  try {
    const  bookId = req.params.id;

    if (!Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid book ID." });
    }

    const reviews = await Review.find({ bookId, status: "approved" })
      .populate("userId", "name photo") // get user info
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ success: false, message:err.message ||  "Failed to fetch reviews." });
  }
};

//update reviews status
export const updateReviewStatus = async (req: Request, res: Response) => {
  try {
    const { status,reviewId } = req.body;
    if (!Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const allowedStatus = ["pending", "approved"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const review = await Review.findByIdAndUpdate(
      reviewId,
      { status },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Review status updated to ${status}`,
      data: review,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to update review status",
    });
  }
};

//get all reviews
export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate("userId", "name email photo")
        .populate("bookId", "title author coverImage")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(filter),
    ]);

    res.status(200).json({
      success: true,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: reviews,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to fetch reviews",
    });
  }
};

//delete review 
export const deleteReviewById = async (req: Request, res: Response) => {
  try {
    const reviewId  = req.params.id;
    if (!Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to delete review",
    });
  }
};