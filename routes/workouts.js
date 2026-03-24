const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');
const { workoutValidationRules, validateObjectId, validate } = require('../middleware/validation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       required:
 *         - name
 *         - type
 *         - duration
 *         - calories
 *         - difficulty
 *         - equipment
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         type:
 *           type: string
 *           enum: [Cardio, Strength, Flexibility, Sports, Other]
 *         duration:
 *           type: integer
 *         calories:
 *           type: integer
 *         difficulty:
 *           type: string
 *           enum: [Easy, Medium, Hard]
 *         equipment:
 *           type: string
 *         description:
 *           type: string
 *         dateCreated:
 *           type: string
 */

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of workouts
 */
router.get('/', workoutsController.getAllWorkouts);

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Workout found
 *       404:
 *         description: Workout not found
 */
router.get('/:id', validateObjectId(), validate, workoutsController.getSingleWorkout);

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create new workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Workout created
 */
router.post('/', workoutValidationRules(), validate, workoutsController.createWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   put:
 *     summary: Update workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       204:
 *         description: Workout updated
 */
router.put('/:id', validateObjectId(), workoutValidationRules(), validate, workoutsController.updateWorkout);

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     summary: Delete workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Workout deleted
 */
router.delete('/:id', validateObjectId(), validate, workoutsController.deleteWorkout);

module.exports = router;