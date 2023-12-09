import { Schema, model } from "mongoose";
import { IMovieDocument } from "../interfaces";

const MovieSchema = new Schema<IMovieDocument>({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, required: true },
    trailer: { type: String, required: true },
    year: { type: Number, required: true },
    criticReviewCount: { type: Number, required: true },
    userReviewCount: { type: Number, required: true },
    criticScoreAvg: { type: Number, required: true },
    userScoreAvg: { type: Number, required: true },
    genres: { type: [String], required: true },
}, {
    timestamps: true,
    versionKey: false,
});

export default model<IMovieDocument>("Movie", MovieSchema);
