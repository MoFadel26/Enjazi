const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/userSchema');

// Connect to MongoDB
async function connectMongoDB() {
  const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
  
  await mongoose.connect(DB);
  console.log('MongoDB connection successful');
}

async function checkAdmin() {
  try {
    await connectMongoDB();
    
    // Define admin credentials to check
    const adminCredentials = {
      email: 'admin@enjazi.com',
      password: 'admin123'
    };
    
    console.log('Checking admin user existence...');
    
    // Check in Users collection
    const userAdmin = await User.findOne({ email: adminCredentials.email });
    
    if (userAdmin) {
      console.log('\n✓ Admin found in User collection:');
      console.log('- Username:', userAdmin.username);
      console.log('- Email:', userAdmin.email);
      console.log('- Role:', userAdmin.role);
      
      // Check password
      const isPasswordCorrect = await bcrypt.compare(adminCredentials.password, userAdmin.password);
      console.log('- Password matches:', isPasswordCorrect ? '✓ Yes' : '❌ No');
      
      if (!isPasswordCorrect) {
        console.log('\n❌ Password verification failed. The password hash doesn\'t match "admin123".');
      }
    } else {
      console.log('\n❌ Admin user NOT found in User collection');
    }
    
    // Check if 'admin' collection exists and contains the admin user
    // Create a model that uses the 'admin' collection
    const Admin = mongoose.model('Admin', User.schema, 'admin');
    
    const adminCollectionAdmin = await Admin.findOne({ email: adminCredentials.email });
    
    if (adminCollectionAdmin) {
      console.log('\n✓ Admin found in admin collection:');
      console.log('- Username:', adminCollectionAdmin.username);
      console.log('- Email:', adminCollectionAdmin.email);
      console.log('- Role:', adminCollectionAdmin.role);
      
      // Check password
      const isPasswordCorrect = await bcrypt.compare(adminCredentials.password, adminCollectionAdmin.password);
      console.log('- Password matches:', isPasswordCorrect ? '✓ Yes' : '❌ No');
      
      if (!isPasswordCorrect) {
        console.log('\n❌ Password verification failed. The password hash doesn\'t match "admin123".');
      }
    } else {
      console.log('\n❌ Admin user NOT found in admin collection');
    }
    
    // If admin not found anywhere, provide instructions
    if (!userAdmin && !adminCollectionAdmin) {
      console.log('\n❌ Admin user not found in any collection.');
      console.log('\nTo create the admin user, run:');
      console.log('node scripts/createAdmin.js');
    }
    
    // List all collections in the database
    console.log('\nAll collections in database:');
    const collections = await mongoose.connection.db.collections();
    collections.forEach(collection => {
      console.log(`- ${collection.collectionName}`);
    });
    
  } catch (error) {
    console.error('Error checking admin user:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

checkAdmin(); 