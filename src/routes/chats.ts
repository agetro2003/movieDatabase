import { Router } from "express";
import { ChatController } from "../controllers";

const router = Router();

router.get("/", ChatController.getPublicChats);

router.get("/user", ChatController.getUserChats);

router.get("/all", ChatController.getAllChats);

router.get("/:id", ChatController.getDetailChat);

router.post("/create", ChatController.createChat);

export default router;