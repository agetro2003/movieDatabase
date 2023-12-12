import { Request, Response } from "express";
import BaseController from "./BaseController";
import { Review } from "../models";
import { AuthRequest, IReviewDocument } from "../interfaces";

class ReviewController extends BaseController{
//funcion para crear Reviews
createReview = async (req: Request, res: Response): Promise<Response> => {;
try {
    const {MediaID, score, content } = req.body;
    const userId = (req as AuthRequest).user._id
    if (score < 0 || score > 5) {
        return this.errorRes(res, 400, "Score must be between 0 and 5");
    }
    let check = await Review.findOne({ userId, MediaID });
    if (check) {
        return this.errorRes(res, 400, "Review already exists");
    }
    
    let newReview;
    if (!content){
        newReview = new Review({ userId, MediaID, score, content: ""});
    }
    else{
        newReview = new Review({ userId, MediaID, score, content});
    }
    await newReview.save();
    return this.successRes(res, 200, "Review created", newReview);
} catch (error) {
    return this.errorRes(res, 500, "Error creating review", error);
}
}

//funcion para obtener Reviews
getReviews = async (req: Request, res: Response): Promise<Response> => {
try {
    const { id } = req.params;
    console.log(id);
    let reviews: any[] = await Review.find({ MediaID: id }).populate("userId");
    const respone = reviews.map((review) => {
        return {
            id: review._id,
            userId: {
                id: review.userId._id,
                username: review.userId.username,
                avatar: review.userId.avatar,
                critic: review.userId.critic,
            },
            score: review.score,
            content: review.content,
        }
    })

    
    console.log(reviews);
    return this.successRes(res, 200, "Reviews found", respone);

}
catch (error) {
    return this.errorRes(res, 500, "Error getting reviews", error);
}
}

//funcion para editar Reviews
editReview = async (req: Request, res: Response): Promise<Response> => {
try {
    const userId = (req as AuthRequest).user._id
    const { id } = req.params;
    const {  score, content } = req.body;
    const review: IReviewDocument | null = await Review.findById(id);
    if (!review) {
        return this.errorRes(res, 400, "Review not found");
    }

    if (!review.userId.equals(userId)) {
        return this.errorRes(res, 400, "You can only edit your own reviews");
    }
    if (score < 0 || score > 5) {
        return this.errorRes(res, 400, "Score must be between 0 and 5");
    }
    if (score){
    review.score = score;
    }
    if (content){
        review.content = content;
    }
    await review.save();
        return this.successRes(res, 200, "Review edited", review);
} catch (error) {
    return this.errorRes(res, 500, "Error editing review", error);
}
}

//funcion para eliminar Reviews
deleteReview = async (req: Request, res: Response): Promise<Response> => {
try {
    const userId = (req as AuthRequest).user._id
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
        return this.errorRes(res, 400, "Review not found");
    }

    if (!review.userId.equals(userId)) {
        return this.errorRes(res, 400, "You can only delete your own reviews");
    }
    await review.deleteOne();
    return this.successRes(res, 200, "Review deleted");
} catch (error) {
    return this.errorRes(res, 500, "Error deleting review", error);
}
}

}

export default new ReviewController();