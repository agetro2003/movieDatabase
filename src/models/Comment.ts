import { Schema, model } from "mongoose";
import { ICommentDocument } from "../interfaces";


const CommentSchema = new Schema<ICommentDocument>(
    {
        commentId: { type: Schema.Types.ObjectId, ref: "Comment", required: false },
        reviewId: { type: Schema.Types.ObjectId, ref: "Review", required: false },  
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<ICommentDocument>("Comment", CommentSchema);
