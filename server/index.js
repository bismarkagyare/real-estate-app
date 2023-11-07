import express from 'express';
import mongoose from 'mongoose';
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
app.use(express.json());

//mount these routes at the specific path
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

//set up the application to listen on port 3005
app.listen('3005', () => {
  console.log('server is running on port 3005');
});
