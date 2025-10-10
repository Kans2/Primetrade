import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js';
import {  getTasks,createTask,updateTask,deleteTask} from '../controllers/taskController.js';
const router = express.Router();


// Applying the authentication middleware to all routes in this router
router.use(verifyToken);

// GET 
router.get('/', getTasks);

// POST 
router.post('/', createTask);

// PUT 
router.put('/:id', updateTask);

// DELETE 
router.delete('/:id', deleteTask);

export default router;