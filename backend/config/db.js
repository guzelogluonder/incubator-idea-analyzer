const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/incubator');
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error('Please make sure MongoDB is running on localhost:27017');
    console.error('Server will continue but database operations will fail.');
    // Don't exit - allow server to run without DB for testing
  }
};

module.exports = connectDB;

