import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config();

//connect to the database using the uri
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Mongodb server');
  })
  .catch(() => {
    console.log('Failed to connect to Mongodb server');
  });

// create an instance of the express application
const app = express();
app.use(cors());
app.use(express.json());

//mount these routes at the specific path
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

//create error middleware function
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  return res.status(statusCode).json({ success: false, message, statusCode });
});

//set up the application to listen on port 3005
app.listen('3005', () => {
  console.log('server is running on port 3005');
});
