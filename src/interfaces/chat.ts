import { Document } from "mongoose";

export interface IChat {
usersId: string[];
}

export interface IChatDocument extends IChat, Document {}