// db.js

const mongoose = require('mongoose');

// Replace with your MongoDB Atlas connection string
const mongoURI =
  'mongodb+srv://omaraouf:DeKryJQvBycuArf2@footwrok.jk0ykzx.mongodb.net/';

const connectToDatabase = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB Atlas:', error);
    });
};

module.exports = { connectToDatabase };
