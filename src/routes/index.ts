import { Router } from "express";
import { checkAuth } from '../middlewares';
import trendingRouter from './trending';
import authRouter from './auth';
import searchRouter from './search';
import mediaRouter from './media';
import reviewRouter from './review';
const router = Router();

router.use('/auth', authRouter);

router.use(checkAuth);

router.use('/trending', trendingRouter);    
router.use('/search', searchRouter);
router.use('/review', reviewRouter);
router.use('/media', mediaRouter);

export default router;