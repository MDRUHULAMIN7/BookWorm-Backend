import express from 'express';
import { createTutorial } from './tutorial.controller.js';

const router = express.Router();
// router.get('/', getAllReviews);
router.post('/', createTutorial);

  

export const TutorialRoutes = router;
