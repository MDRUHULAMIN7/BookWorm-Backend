import { Schema, model } from 'mongoose';
import type { IUser } from './user.interface.js';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password cannot be less than 6 characters'],
    },
    photo: {
      type: String,
      required: [true, 'User Photo is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: false,
  },
);

export const User = model<IUser>('User', userSchema);
