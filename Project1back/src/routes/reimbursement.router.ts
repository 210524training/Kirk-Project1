/* eslint-disable max-len */
import express, { Router } from 'express';
import Reimbursement from '../models/reimbursment';
import reimbursementService from '../services/reimbursementService';

const reimbursementRouter = Router();
reimbursementRouter.get('/', async (req, res) => {
  res.json(
    await reimbursementService.getAll(),
  );
});

reimbursementRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await reimbursementService.getById(id),
  );
});

reimbursementRouter.post('/', async (req: express.Request<unknown, unknown, Reimbursement, unknown, {}>, res) => {
  res.json(
    await reimbursementService.add(req.body),
  );
});

reimbursementRouter.put('/', async (req: express.Request< {}>, res) => {
  const { id, aprovalStatus, additionalInfo } = req.body;
  res.json(
    await reimbursementService.updateStatusInfo(id, aprovalStatus, additionalInfo),
  );
});

reimbursementRouter.put('/gradeinfo', async (req: express.Request< {}>, res) => {
  const { id, grade, additionalInfo } = req.body;
  res.json(
    await reimbursementService.updateGradeOrInfo(id, grade, additionalInfo),
  );
});

reimbursementRouter.put('/benco', async (req: express.Request< {}>, res) => {
  const {
    id, aprovalStatus, additionalInfo, projectedReimbursement,
  } = req.body;
  res.json(
    await reimbursementService.updateBenco(id, aprovalStatus, additionalInfo, projectedReimbursement),
  );
});

reimbursementRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  res.json(
    await reimbursementService.delete(id),
  );
});

export default reimbursementRouter;
