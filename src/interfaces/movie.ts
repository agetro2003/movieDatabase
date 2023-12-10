import { Document } from "mongoose";

export interface IMovie {
MovieID: number;
title: string;
overview: string;
poster: string;
backdrop: string;
trailer: string;
year: number;
criticReviewCount: number;
userReviewCount: number;
criticScoreAvg: number;
userScoreAvg: number;
genres: Object[];
cast: Object[];
similar: Object[];
}

export interface IMovieDocument extends IMovie, Document {}