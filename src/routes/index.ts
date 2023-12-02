import { Router } from "express";
import { checkAuth } from '../middlewares';

import authRouter from './auth';

const routes = Router();

routes.use('/auth', authRouter);

routes.use(checkAuth);

routes.get('/', (req, res) => {
    res.json({ message: 'Hello world' });
});
export default routes;