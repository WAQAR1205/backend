import express from 'express';
import {getMyProfile, loginuser, logout, VerfiyUser} from '../controllers/loginuser.js';
import {signupUser} from '../controllers/signupuser.js';
import {addTasks, deleteTask, updateTask} from '../controllers/tasksdata.js';
import {IsAuthenticated} from '../middleware/auth.js';

export const router = express.Router();
// Signup Route
router.route('/signup').post(signupUser);

// Login Route
router.route('/verify').post(IsAuthenticated, VerfiyUser);
router.route('/login').post(loginuser);
router.route('/logout').get(logout);

// Tasks Route

router
  .route('/Task/:id')
  .put(IsAuthenticated, updateTask)
  .delete(IsAuthenticated, deleteTask);
router.route('/addTask').post(IsAuthenticated, addTasks);
