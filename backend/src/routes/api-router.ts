import {Router, Request, Response} from 'express';

import userRouter from './api/user-router';

const apiRouter = Router();

// NOT CHECK PERMISSIONS
apiRouter.get('/app/health', async (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    data: process.memoryUsage(),
  });
});

apiRouter.use('/user', userRouter);

export {apiRouter};
