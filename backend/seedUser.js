// Run this script once to create a demo user for login
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_project';

async function seed() {
  await mongoose.connect(MONGO_URI);
  const email = 'm32220@gmail.com';
  const password = 'password123';
  const hashed = await bcrypt.hash(password, 10);
  await User.deleteMany({ email });
  await User.create({ email, password: hashed });
  console.log('Demo user created:', email, '/', password);
  mongoose.disconnect();
}

seed();
