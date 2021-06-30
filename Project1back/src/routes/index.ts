import express, { Router } from 'express';
import userRouter from './user.router';
import reimbursementRouter from './reimbursement.router';
import userService from '../services/userService';

const baseRouter = Router();

baseRouter.post('/login', async (req: express.Request<unknown, unknown, { username: string, password: string }, unknown, {}>, res) => {
  const { username, password } = req.body;
  console.log(username, password);

  const user = await userService.login(username, password);

  req.session.isLoggedIn = true;

  req.session.user = user;

  res.status(200).json(req.session.user);
});

export async function logout(req: express.Request, res: express.Response): Promise<void> {
  if(req.session.user) {
    const { username } = req.session.user;

    req.session.destroy(() => {
      console.log(`${username} logged out`);
    });
  }
  // If they aren't logged in, we don't need to do anything

  res.status(202).end();
}

baseRouter.use('/api/v1/users', userRouter);

baseRouter.use('/api/v1/reimbursements', reimbursementRouter);
export default baseRouter;
