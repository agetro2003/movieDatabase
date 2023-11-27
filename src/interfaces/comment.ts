
import { Document, Types } from 'mongoose';

export interface IComment {
    userId: Types.ObjectId;
    isReplyTo: {
        type: string;
        id: Types.ObjectId | string;
    }
    content: string;
    }

export interface ICommentDocument extends IComment, Document {}