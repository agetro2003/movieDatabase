import { Types, Document } from "mongoose";

export interface IReview {
  userId: Types.ObjectId;
  MediaID: number;
  score: number;
  content: string;
}

export interface IReviewDocument extends IReview, Document {}
