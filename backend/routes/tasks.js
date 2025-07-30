
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get single task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add new task
router.post('/', async (req, res) => {
  try {
    const { title, description, category, status, date, avatar } = req.body;
    const task = new Task({ title, description, category, status, date, avatar });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
