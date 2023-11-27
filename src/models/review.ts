import { Schema, model } from "mongoose";
import { IReviewDocument } from "../interfaces";


const ReviewSchema = new Schema<IReviewDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        movieId: { type: Number, default: null },
        content: { type: String },
        score: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<IReviewDocument>("Review", ReviewSchema);