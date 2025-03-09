/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [''],
    credentials: true,
  }),
);
app.use(bodyParser.json());

// application route

// Test route
const test = async (req: Request, res: Response) => {
  res.send('TutorLink server is running...');
};

app.get('/', test);

// Error handlers

export default app;
