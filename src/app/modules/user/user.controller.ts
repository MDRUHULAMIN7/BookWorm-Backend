import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './user.model.js';
// Adjust path based on your structure

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

// LOGIN
export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

// LOGOUT
export const logoutUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token missing',
      });
    }

    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Invalid token',
      });
    }

    user.token = '';
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false,
      message: error.message || 'Logout failed'
    });
  }
};

