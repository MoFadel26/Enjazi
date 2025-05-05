const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Import the database connection function
const connectMongoDB = require('../config/db');

// Define a test schema and model
const TestSchema = new mongoose.Schema({
  name: String,
  value: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

async function testCrudOperations() {
  try {
    // Connect to database
    await connectMongoDB();
    console.log('✓ Database connection successful');
    
    // Create a temporary model for testing
    const TestModel = mongoose.model('TestModel', TestSchema);
    
    // ---------- CREATE ----------
    console.log('\n--- Testing CREATE operation ---');
    const newDoc = await TestModel.create({
      name: 'test-item',
      value: Math.floor(Math.random() * 100)
    });
    console.log('✓ Created document:', newDoc);
    
    // ---------- READ ----------
    console.log('\n--- Testing READ operation ---');
    const foundDoc = await TestModel.findById(newDoc._id);
    console.log('✓ Found document:', foundDoc);
    
    // ---------- UPDATE ----------
    console.log('\n--- Testing UPDATE operation ---');
    const updatedDoc = await TestModel.findByIdAndUpdate(
      newDoc._id,
      { value: 999 },
      { new: true }
    );
    console.log('✓ Updated document:', updatedDoc);
    
    // ---------- DELETE ----------
    console.log('\n--- Testing DELETE operation ---');
    const deletedDoc = await TestModel.findByIdAndDelete(newDoc._id);
    console.log('✓ Deleted document:', deletedDoc);
    
    // Verify deletion
    const checkDeleted = await TestModel.findById(newDoc._id);
    if (!checkDeleted) {
      console.log('✓ Confirmed document was deleted');
    } else {
      console.log('❌ Document was not deleted properly');
    }
    
    // Delete the test collection
    await mongoose.connection.db.dropCollection('testmodels');
    console.log('✓ Test collection cleaned up');
    
    console.log('\nAll CRUD operations completed successfully! ✓');
  } catch (error) {
    console.error('❌ CRUD test failed:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testCrudOperations(); 