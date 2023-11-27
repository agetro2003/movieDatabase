import { Schema, model } from "mongoose";
import { IReviewDocument } from "../interfaces";


const ReviewSchema = new Schema<IReviewDocument>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        movieId: { type: Number, default: null },
        isReplyTo: { type: Schema.Types.ObjectId, ref: "Review", default: null },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<IReviewDocument>("Review", ReviewSchema);