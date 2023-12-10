import { Router } from "express";
import { MovieController } from "../controllers";

const router = Router();

router.get("/:id", MovieController.getMovie);

export default router;