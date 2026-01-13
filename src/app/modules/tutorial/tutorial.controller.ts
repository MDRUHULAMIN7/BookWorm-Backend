
import type{ Request, Response } from 'express';
import { User } from '../user/user.model.js';
import Tutorial from './tutorial.model.js';

export const createTutorial = async (req: Request, res: Response) => {
  try {
    const { title, description, videoUrl, userId } = req.body;

    // Validate required fields
    if (!title || !videoUrl || !userId) {
      return res.status(400).json({ success: false, message: 'Title, video URL, and userId are required.' });
    }

    // Fetch user by ID and check role
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admins can create tutorials.' });
    }

    // Create tutorial
    const tutorial = await Tutorial.create({
      title,
      description,
      videoUrl,
      createdBy: user._id,
    });

    res.status(201).json({
      success: true,
      data: tutorial,
      message: 'Tutorial created successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error while creating tutorial',
    });
  }
};

