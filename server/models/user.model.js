import mongoose, { Schema } from 'mongoose';

// Define a schema for the user: specify the structure of a user document in MongoDB
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create a Mongoose model named 'User' based on the userSchema
const User = mongoose.model('User', userSchema);

export default User;
