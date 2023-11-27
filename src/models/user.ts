import { Schema, model } from "mongoose";
import { type IUserDocument } from "../interfaces";

const UserSchema = new Schema<IUserDocument>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    avatar: { type: String, default: "https://firebasestorage.googleapis.com/v0/b/ramble-322a6.appspot.com/o/test%2F1698975678282.jpeg?alt=media&token=c9a7b759-be64-4a3e-aa5b-b932c7b7159f" },
    critic: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IUserDocument>("User", UserSchema);
