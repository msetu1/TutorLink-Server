/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandlder';
import notFound from './app/middlewares/notFound';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8000/'],
    credentials: true,
  }),
);
app.use(bodyParser.json());

// application route
app.use('/api', router);

// Test route
const test = async (req: Request, res: Response) => {
  res.send('TutorLink server is running...');
};

app.get('/', test);

// Error handlers
app.use(globalErrorHandler);
app.use(notFound);

export default app;
