require('dotenv').config();
const mongoose = require("mongoose");
const connectToDatabase = require('../config/db_connection');

describe('Database Connection', () => {
  
  afterAll(async () => {
    await Promise.all(mongoose.connections.map(con => con.close()));
  }, 5000); 

  test('should connect to the MongoDB database', async () => {
    const result = await connectToDatabase(process.env._MONGO_URI,"test");
    expect(result).toBe(true);
  });

  test('should not connect to the MongoDB database', async () => {
    const result = await connectToDatabase("mongodb://invalid","test");
    expect(result).toBe(false);
  }, 5000); 

});
