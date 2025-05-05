const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE',
  'DATABASE_PASSWORD',
  'JWT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is not defined in .env file`);
    process.exit(1);
  }
}

// Construct MongoDB URI
const mongoUri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

// Use 'users' collection
const SimpleUser = mongoose.model('SimpleUser', User.schema, 'users');

const simpleUser = {
  username: 'user',
  email: 'user@user.com',
  password: '123',
  role: 'user'
};

async function createSimpleUser() {
  try {
    console.log('Connecting to MongoDB...');
    console.log('Database: enjazi');
    console.log('Collection: users');

    await mongoose.connect(mongoUri);

    const existing = await SimpleUser.findOne({
      $or: [
        { email: simpleUser.email },
        { username: simpleUser.username }
      ]
    });

    if (existing) {
      console.log('User already exists in the database');
      console.log(`Email: ${simpleUser.email}`);
      console.log(`Password: ${simpleUser.password}`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    simpleUser.password = await bcrypt.hash(simpleUser.password, salt);

    const user = new SimpleUser(simpleUser);
    await user.save();

    console.log('\nSimple user created successfully!');
    console.log('Collection: users');
    console.log('Username:', simpleUser.username);
    console.log('Email:', simpleUser.email);
    console.log('Password:', 'password123');
    console.log('Role:', 'user');
    console.log('\nUse these credentials for quick testing');

    process.exit(0);
  } catch (err) {
    console.error('Error creating user:', err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
}

createSimpleUser();
