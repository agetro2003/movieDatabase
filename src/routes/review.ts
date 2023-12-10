import { Router } from "express";
import { ReviewController } from "../controllers";

const router =  Router();

router.post("/create", ReviewController.createReview);

export default router;