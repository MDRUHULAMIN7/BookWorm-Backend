import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './user.model.js';
import bcrypt from 'bcryptjs';
// Adjust path based on your structure

// REGISTER

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email,password,name,photo } = req.body;

    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      photo,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};


// LOGIN
export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email)

    // 1. check user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 2. compare password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // 3. generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' }
    );

    // 4. remove password from response
    const userData = user.toObject();
    // delete userData?.password;

    // 5. send response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

// LOGOUT
export const logoutUser = async (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

