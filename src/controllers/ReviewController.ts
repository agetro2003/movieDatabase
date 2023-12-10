import { Request, Response } from "express";
import BaseController from "./BaseController";
import { Review } from "../models";

class ReviewController extends BaseController{
//funcion para crear Reviews
createReview = async (req: Request, res: Response): Promise<Response> => {
try {
    const { userId, MediaID, score, content } = req.body;
    if (score < 0 || score > 5) {
        return this.errorRes(res, 400, "Score must be between 0 and 5");
    }
    let check = await Review.findOne({ userId, MediaID });
    if (check) {
        return this.errorRes(res, 400, "Review already exists");
    }
    
    let newReview;
    if (!content){
        newReview = new Review({ userId, MediaID, score});
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
    const { MediaID } = req.params;
    const reviews = await Review.find({ MediaID });
    return this.successRes(res, 200, "Reviews found", reviews);

}
catch (error) {
    return this.errorRes(res, 500, "Error getting reviews", error);
}
}
}

export default new ReviewController();