import { Router } from "express";
import TrendingController from "../controllers/TrendingController";

const router = Router();

router.get("/:type/:time", TrendingController.getTrendings);

export default router;