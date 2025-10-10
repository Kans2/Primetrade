import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  description: String,
  status: { type: String, enum: ['todo','inprogress','done'], default: 'todo' },
  dueDate: Date
}, { timestamps: true });

export default mongoose.model('Task', TaskSchema);
