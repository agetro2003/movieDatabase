import { Router } from "express";
import SearchController from "../controllers/SearchController";


const router = Router();

router.get('/', SearchController.searchByText);

router.get('/filter', SearchController.searchFilter);

export default router;