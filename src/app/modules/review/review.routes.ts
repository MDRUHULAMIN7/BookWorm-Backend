import express from 'express';
import { addReview, deleteReviewById, getAllReviews, getApprovedReviewsByBook, updateReviewStatus } from './review.controller.js';

const router = express.Router();
router.get('/', getAllReviews);
router.post('/:id', addReview);
router.get('/approved/:id', getApprovedReviewsByBook);             
router.patch('/status', updateReviewStatus);         
router.delete("/:id",deleteReviewById);

  

export const ReviewRoutes = router;
