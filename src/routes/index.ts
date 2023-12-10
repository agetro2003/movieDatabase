import { Router } from "express";
import { checkAuth } from '../middlewares';
import trendingRouter from './trending';
import authRouter from './auth';
import searchRouter from './search';
import movieRouter from './movie';

const router = Router();

router.use('/auth', authRouter);

router.use(checkAuth);

router.get('/', (req, res) => {
    res.json({ message: 'Hello world' });
});

router.use('/trending', trendingRouter);    
router.use('/search', searchRouter);
router.use('/movie', movieRouter);
export default router;