import type { Types } from "mongoose";

export interface IGenre {
  title: string;
  author:string;
  genreId:Types.ObjectId;
  description: string;
  summary:string;
  coverImage:string
}
