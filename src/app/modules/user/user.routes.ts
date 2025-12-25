import express from 'express';
import {
  registerUser,
  signInUser,
  logoutUser,

} from './user.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', signInUser);
router.post('/logout', logoutUser);

export const UserRoutes = router;
