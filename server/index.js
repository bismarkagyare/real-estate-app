import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to Mongodb server');
  })
  .catch(() => {
    console.log('Failed to connect to Mongodb server');
  });

const app = express();
app.listen('3005', () => {
  console.log('server is running on port 3005');
});
