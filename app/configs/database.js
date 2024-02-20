'use strict';

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'AvilaTek',
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDb; 
