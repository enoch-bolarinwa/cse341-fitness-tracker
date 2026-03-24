const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const result = await mongodb.getDatabase()
      .collection('workouts')
      .find()
      .toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving workouts',
      error: error.message 
    });
  }
};

// Get single workout
const getSingleWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase()
      .collection('workouts')
      .findOne({ _id: workoutId });
    
    if (!result) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error retrieving workout',
      error: error.message 
    });
  }
};

// Create workout
const createWorkout = async (req, res) => {
  try {
    const workout = {
      name: req.body.name,
      type: req.body.type,
      duration: req.body.duration,
      calories: req.body.calories,
      difficulty: req.body.difficulty,
      equipment: req.body.equipment,
      description: req.body.description || '',
      dateCreated: req.body.dateCreated || new Date().toISOString().split('T')[0]
    };

    const result = await mongodb.getDatabase()
      .collection('workouts')
      .insertOne(workout);
    
    if (result.acknowledged) {
      res.status(201).json({ 
        message: 'Workout created successfully',
        id: result.insertedId 
      });
    } else {
      res.status(500).json({ message: 'Failed to create workout' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating workout',
      error: error.message 
    });
  }
};

// Update workout
const updateWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    
    const workout = {
      name: req.body.name,
      type: req.body.type,
      duration: req.body.duration,
      calories: req.body.calories,
      difficulty: req.body.difficulty,
      equipment: req.body.equipment,
      description: req.body.description || '',
      dateCreated: req.body.dateCreated || new Date().toISOString().split('T')[0]
    };

    const result = await mongodb.getDatabase()
      .collection('workouts')
      .replaceOne({ _id: workoutId }, workout);
    
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Workout not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating workout',
      error: error.message 
    });
  }
};

// Delete workout
const deleteWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    
    const result = await mongodb.getDatabase()
      .collection('workouts')
      .deleteOne({ _id: workoutId });
    
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Workout deleted successfully' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting workout',
      error: error.message 
    });
  }
};

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
};