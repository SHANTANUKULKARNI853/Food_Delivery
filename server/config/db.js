const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting with URI:', process.env.MONGODB_URI); // Debug line
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;