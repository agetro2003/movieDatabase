
import { Document } from 'mongoose';

export interface IMovieScore {
    movieId: string;
    userId: string;
    score: number;
    }

export interface IMovieScoreDocument extends IMovieScore, Document {}