import { Types, Document } from "mongoose";

export interface  IReview {
    userId: Types.ObjectId;
    movieId: number | null;
    isReplyTo: Types.ObjectId | null;
    content: string;
}

export interface IReviewDocument extends IReview, Document {}