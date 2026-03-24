const { body, param, validationResult } = require('express-validator');

// Workout validation rules
const workoutValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Workout name is required').trim(),
    body('type').notEmpty().withMessage('Workout type is required').isIn(['Cardio', 'Strength', 'Flexibility', 'Sports', 'Other']).withMessage('Invalid workout type'),
    body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive number (minutes)'),
    body('calories').isInt({ min: 0 }).withMessage('Calories must be a non-negative number'),
    body('difficulty').notEmpty().isIn(['Easy', 'Medium', 'Hard']).withMessage('Difficulty must be Easy, Medium, or Hard'),
    body('equipment').notEmpty().withMessage('Equipment field is required').trim(),
    body('description').optional().trim(),
    body('dateCreated').optional().isISO8601().withMessage('Invalid date format')
  ];
};

// User validation rules
const userValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required').trim(),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('age').isInt({ min: 13, max: 120 }).withMessage('Age must be between 13 and 120'),
    body('weight').isFloat({ min: 20, max: 500 }).withMessage('Weight must be between 20 and 500 kg'),
    body('height').isFloat({ min: 50, max: 300 }).withMessage('Height must be between 50 and 300 cm'),
    body('goals').notEmpty().withMessage('Goals field is required').trim()
  ];
};

// Validate MongoDB ObjectId
const validateObjectId = () => {
  return [
    param('id').isMongoId().withMessage('Invalid ID format')
  ];
};

// Check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors: errors.array() 
    });
  }
  next();
};

module.exports = {
  workoutValidationRules,
  userValidationRules,
  validateObjectId,
  validate
};