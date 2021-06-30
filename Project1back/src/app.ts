import expressSession from 'express-session';
import express from 'express';
import 'express-async-errors';
// import StatusCodes from 'http-status-codes';
import dotenv from 'dotenv';
import cors from 'cors';
// import log from './log';
import baseRouter from './routes';

dotenv.config({});

const app = express();

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:3000',
  ],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({
  secret: 'should be from enviorment',
  cookie: {},
}));

app.use('/', baseRouter);

export default app;
