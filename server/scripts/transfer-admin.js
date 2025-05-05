const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/userSchema');

// Connect to MongoDB
async function connectMongoDB() {
  const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
  
  await mongoose.connect(DB);
  console.log('MongoDB connection successful');
}

async function transferAdmin() {
  try {
    await connectMongoDB();
    
    // Create a model that uses the 'admin' collection
    const Admin = mongoose.model('Admin', User.schema, 'admin');
    
    // Find admin user in admin collection
    const adminUser = await Admin.findOne({ email: 'admin@enjazi.com' });
    
    if (!adminUser) {
      console.error('❌ Admin user not found in admin collection');
      console.log('Run createAdmin.js first to create the admin user');
      return;
    }
    
    console.log('Found admin user in admin collection:');
    console.log('- Username:', adminUser.username);
    console.log('- Email:', adminUser.email);
    
    // Check if admin already exists in users collection
    const existingUser = await User.findOne({ email: adminUser.email });
    
    if (existingUser) {
      console.log('❌ User with email', adminUser.email, 'already exists in users collection');
      return;
    }
    
    // Create a new user document based on the admin document
    const userData = adminUser.toObject();
    
    // Remove MongoDB-specific fields that would cause issues on insert
    delete userData._id;
    
    // Create the user in the users collection
    const newUser = await User.create(userData);
    
    console.log('\n✓ Admin user successfully transferred to users collection');
    console.log('- New User ID:', newUser._id);
    console.log('- Username:', newUser.username);
    console.log('- Email:', newUser.email);
    console.log('- Role:', newUser.role);
    
  } catch (error) {
    console.error('Error transferring admin user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

transferAdmin(); 