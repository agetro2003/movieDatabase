import { Request, Response } from "express";
import BaseController from "./BaseController";
import { ICommentDocument } from "../interfaces";
import { Comment } from "../models";

class CommentController extends BaseController {
    //funcion para crear un comentario]
        createComment = async (req: Request, res: Response): Promise<Response> => {
        const { userId, type, isReplyTo, content } = req.body;
        if (!userId || !type || !content || !isReplyTo) {
            return this.errorRes(res, 400, "Missing fields");
        } 
        if (type !== "comment" && type !== "review") {
            return this.errorRes(res, 400, "Invalid type");
        }
        try {
            const newComment: ICommentDocument = new Comment({
                commentId: type === "comment"? isReplyTo : null,
                reviewId: type === "review"? isReplyTo : null,
                userId: userId,
                content: content,
                }
            );
            await newComment.save();
            return this.successRes(res, 200, "comment created", newComment);
        } catch (error) {
            return this.errorRes(res, 500, "Error creating comment", error);
        }
    }

    //funcion para borrar un comentario
    //funcion para editar un comentario
    //funcion para obtener todos los comentarios de una review o comentario
    getComments = async (req: Request, res: Response): Promise<Response> => {
        const { type, isReplyTo } = req.params;
        if (!type || !isReplyTo) {
            return this.errorRes(res, 400, "Missing fields");
        }
        if (type !== "comment" && type !== "review") {
            return this.errorRes(res, 400, "Invalid type");
        }
        try {
            const comments = await Comment.find({
                commentId: type === "comment"? isReplyTo : null,
                reviewId: type === "review"? isReplyTo : null,
            });
            return this.successRes(res, 200, "Comments found", comments);
        } catch (error) {
            return this.errorRes(res, 500, "Error getting comments", error);
        }
    }
}

export default new CommentController();