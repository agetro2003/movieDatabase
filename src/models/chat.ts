import { Schema, model } from "mongoose";
import { IChatDocument } from "../interfaces";


const ChatSchema = new Schema<IChatDocument>(
    {
        usersId: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<IChatDocument>("Chat", ChatSchema);