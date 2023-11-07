import mongoose from 'mongoose';

//define a schema for the user: how the data should look like or specify the structure of a user document in mongodb
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
  { timeStamps: true }
);

//model: a constructor function that corresponds to the collections in the database. provides methods to interact with the collection
const User = mongoose.model('User', userSchema);

export default User;
