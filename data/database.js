const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Database is already initialized!');
    return callback(null, database);
  }

  if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI is not defined in environment variables');
    console.error('❌', error.message);
    return callback(error);
  }

  console.log('Connecting to database...');

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db();
      console.log('✅ Database connected successfully');
      callback(null, database);
    })
    .catch((err) => {
      console.error('❌ Failed to connect to database:', err.message);
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};