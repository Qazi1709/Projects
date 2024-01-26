import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  tasks: [taskSchema], 
  verificationToken: String,
}, { timestamps: true });

const userModel = mongoose.model('Users', userSchema, 'users');
export default userModel;
