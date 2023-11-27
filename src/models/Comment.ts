import { Schema, model } from "mongoose";
import { ICommentDocument } from "../interfaces";


const CommentSchema = new Schema<ICommentDocument>(
    {
        isReplyTo: {
            type: {
                type: String,
                enum: ["Review", "Comment"],
                required: true,
            },
            id: { type: Schema.Types.Mixed, required: true },
        },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<ICommentDocument>("Comment", CommentSchema);
