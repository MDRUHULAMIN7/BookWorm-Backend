

import type { Types } from "mongoose";

export interface ITutorial {
  _id: Types.ObjectId;      
  title: string;        
  description?: string;  
  videoUrl: string;      
  createdBy:Types.ObjectId;    
  createdAt: Date;
  updatedAt: Date;    
}
