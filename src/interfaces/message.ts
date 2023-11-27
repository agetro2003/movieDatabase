import { Document } from "mongoose";

export interface IMessage {
userId: string;
chatId: string;
content: string;
}

export interface IMessageDocument extends IMessage, Document {}