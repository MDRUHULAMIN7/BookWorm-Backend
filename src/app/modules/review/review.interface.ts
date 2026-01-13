import { Types } from "mongoose";


export interface IReview {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  rating: number;
  comment: string;
  status:'pending' | 'approved';
  createdAt: Date;
  updatedAt: Date;
}
