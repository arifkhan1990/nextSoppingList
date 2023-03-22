import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    default: "user"
  }
});

const User = mongoose.models.User || model('User', UserSchema);

export default User;
