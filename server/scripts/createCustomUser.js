require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema.js');

async function createCustomUser() {
  try {
    // Get command line arguments
    const args = process.argv.slice(2);
    
    // Default values
    let username = 'test';
    let email = 'test@test.com';
    let password = 'Test@123';
    let role = 'user';
    
    // Parse command line arguments
    args.forEach(arg => {
      const [key, value] = arg.split('=');
      if (key === 'username') username = value;
      if (key === 'email') email = value;
      if (key === 'password') password = value;
      if (key === 'role') role = value;
    });

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingUser) {
      console.log('User already exists with this email or username');
      console.log(`Email: ${email}`);
      await mongoose.disconnect();
      return;
    }

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      console.log('Invalid role. Role must be "user" or "admin"');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Save user to database
    await newUser.save();

    console.log('User created successfully!');
    console.log('----------------------------');
    console.log(`Username: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Role: ${role}`);
    console.log('----------------------------');

  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the function
createCustomUser();

// Example usage:
// node createCustomUser.js username=john email=john@example.com password=John@123 role=admin 