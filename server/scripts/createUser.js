require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema.js');

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Define easy-to-remember credentials
    const userData = {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'Admin@123',
      role: 'admin'
    };

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email: userData.email }, { username: userData.username }] 
    });

    if (existingUser) {
      console.log('User already exists with this email or username');
      console.log(`Email: ${userData.email}`);
      console.log(`Password: ${userData.password}`);
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    // Create new user
    const newUser = new User({
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role
    });

    // Save user to database
    await newUser.save();

    console.log('User created successfully!');
    console.log('----------------------------');
    console.log(`Username: ${userData.username}`);
    console.log(`Email: ${userData.email}`);
    console.log(`Password: ${userData.password}`);
    console.log(`Role: ${userData.role}`);
    console.log('----------------------------');

  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
createAdminUser(); 