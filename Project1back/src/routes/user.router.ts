import express, { Router } from 'express';
import User from '../models/users';
import userService from '../services/userService';

// User-route
const userRouter = Router();
userRouter.get('/', async (req, res) => {
  console.log('Reached our user router get all function');

  res.json(
    await userService.getAll(),
  );
});

userRouter.get('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(
    await userService.getByUsername(username),
  );
});
userRouter.post('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.add(req.body),
  );
});

userRouter.put('/', async (req: express.Request<unknown, unknown, User, unknown, {}>, res) => {
  res.json(
    await userService.update(req.body),
  );
});
userRouter.delete('/:username', async (req, res) => {
  const { username } = req.params;

  res.json(
    await userService.delete(username),
  );
});

export default userRouter;
