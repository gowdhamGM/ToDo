const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskId: { type: String, required: true },
  title: { type: String, required: true },
  priority: { type: String, required: true },
  status: { type: String, default: 'To Do' },
  progress: { type: Number, default: 0 }
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');
