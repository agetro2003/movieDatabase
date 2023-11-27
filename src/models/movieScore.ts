import { Schema, model } from "mongoose";
import { IMovieScoreDocument } from "../interfaces";


const MovieScoreSchema = new Schema<IMovieScoreDocument>(
    {
        movieId: { type: String, required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        score: { type: Number, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model<IMovieScoreDocument>("MovieScore", MovieScoreSchema);
