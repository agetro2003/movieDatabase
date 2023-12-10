import { Schema, model } from "mongoose";
import { IMovieDocument } from "../interfaces";

const MovieSchema = new Schema<IMovieDocument>({
    MovieID: { type: Number, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, required: true },
    trailer: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [Object], required: true },
    crew: { type: [Object], required: true },
    similar: { type: [Object], required: true },
}, {
    timestamps: true,
    versionKey: false,
});

export default model<IMovieDocument>("Movie", MovieSchema);
