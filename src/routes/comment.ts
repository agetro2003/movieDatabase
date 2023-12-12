import { Router } from "express";
import { CommentController } from "../controllers";

const router = Router();

router.post('/create', CommentController.createComment);
router.get('/:type/:isReplyTo', CommentController.getComments);

export default router;