import { Schema, model } from "mongoose";
import { IMediaDocument } from "../interfaces";

const MediaSchema = new Schema<IMediaDocument>(
  {
    MediaID: { type: Number, required: true },
    title: { type: String, required: true },
    original_title: { type: String, required: true },
    original_language: { type: String, required: true },
    overview: { type: String, required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, required: true },
    trailer: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [Object], required: true },
    cast: { type: [Object], required: true },
    similar: { type: [Object], required: true },
    mediaType: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IMediaDocument>("Media", MediaSchema);
