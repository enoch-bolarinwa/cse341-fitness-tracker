const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDatabase()
      .collection('users')
      .find()
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving users',
      error: error.message 
    });
  }
};

// Get single user
const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase()
      .collection('users')
      .findOne({ _id: userId });
    
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving user',
      error: error.message 
    });
  }
};

// Create user
const createUser = async (req, res) => {
  try {
    const user = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      goals: req.body.goals
    };

    const result = await mongodb.getDatabase()
      .collection('users')
      .insertOne(user);
    
    if (result.acknowledged) {
      res.status(201).json({ 
        message: 'User created successfully',
        id: result.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Failed to create user' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating user',
      error: error.message 
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    
    const user = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      weight: req.body.weight,
      height: req.body.height,
      goals: req.body.goals
    };

    const result = await mongodb.getDatabase()
      .collection('users')
      .replaceOne({ _id: userId }, user);
    
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating user',
      error: error.message 
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    
    const result = await mongodb.getDatabase()
      .collection('users')
      .deleteOne({ _id: userId });
    
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting user',
      error: error.message 
    });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};