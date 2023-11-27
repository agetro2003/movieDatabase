
import { Document, Types } from 'mongoose';

export interface IMovieScore {
    movieId: string;
    userId: Types.ObjectId;
    score: number;
    }

export interface IMovieScoreDocument extends IMovieScore, Document {}