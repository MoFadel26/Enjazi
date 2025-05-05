const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

// Import the database connection function
const connectMongoDB = require('../config/db');

async function testDatabaseConnection() {
  try {
    // Test database connection
    await connectMongoDB();
    console.log('✓ Database connection successful');
    
    // List all collections
    const collections = await mongoose.connection.db.collections();
    console.log('✓ Available collections:', collections.map(c => c.collectionName).join(', '));
    
    // Check database stats
    const stats = await mongoose.connection.db.stats();
    console.log('✓ Database stats:', {
      databaseName: mongoose.connection.db.databaseName,
      collections: stats.collections,
      documents: stats.objects,
      dataSize: `${(stats.dataSize / 1024 / 1024).toFixed(2)} MB`,
      storageSize: `${(stats.storageSize / 1024 / 1024).toFixed(2)} MB`,
    });
    
    console.log('\nDatabase check completed successfully! ✓');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

testDatabaseConnection(); 