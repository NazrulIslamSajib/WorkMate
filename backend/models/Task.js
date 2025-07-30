const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  status: { type: String, enum: ['Pending', 'InProgress', 'Done'], default: 'Pending' },
  date: { type: Date, default: Date.now },
  avatar: { type: String }, // optional: for user/avatar image
});

module.exports = mongoose.model('Task', taskSchema);
