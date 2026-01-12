import { Schema, model } from 'mongoose';
import type { IGenre } from './genre.interface.js';

const genreSchema = new Schema<IGenre>(
  {
    name: {
      type: String,
      required: [true, 'Genre Name is required'],
      maxlength: [20, 'Name cannot be more than 20 characters'],
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  {
    timestamps: false,
  },
);

export const Genre = model<IGenre>('Genre', genreSchema);
