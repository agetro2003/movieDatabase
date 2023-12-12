import { Document } from "mongoose";

export interface IMedia {
  MediaID: number;
  title: string;
  original_title: string;
  original_language: string;
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
  mediaType: string;
}

export interface IMediaDocument extends IMedia, Document {}
