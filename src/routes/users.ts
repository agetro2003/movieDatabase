import { Router } from "express";
import { UserController } from "../controllers";

const router = Router()

router.put('/changePassword', UserController.updatePassword)

export default router