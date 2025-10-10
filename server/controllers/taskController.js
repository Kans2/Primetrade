// taskController.js
import Task from '../models/task.model.js';
// Helper to wrap async functions and catch errors (recommended for Express)
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// @route   GET /api/tasks
// @desc    Get all tasks for the authenticated user, with search
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    // req.user.id is set by the auth middleware
    const userId = req.user.id;
    const q = req.query.q || '';

    const tasks = await Task.find({ 
        user: userId, 
        // Simple case-insensitive regex search on the title field
        title: { $regex: q, $options: 'i' }
    });
    
    res.json(tasks);
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const task = await Task.create({ 
        ...req.body, 
        user: userId 
    });
    
    // Respond with the newly created task
    res.json(task);
});

// @route   PUT /api/tasks/:id
// @desc    Update a task by ID for the authenticated user
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    // Find and update, ensuring the user owns the task
    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId }, 
        req.body, 
        { new: true } // Return the updated document
    );

    if (!task) {
        return res.status(404).json({ msg: 'Task not found or user unauthorized' });
    }

    res.json(task);
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task by ID for the authenticated user
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const taskId = req.params.id;
    
    // Find and delete, ensuring the user owns the task
    const result = await Task.findOneAndDelete({ 
        _id: taskId, 
        user: userId 
    });
    
    if (!result) {
         return res.status(404).json({ msg: 'Task not found or user unauthorized' });
    }

    res.json({ msg: 'Deleted' });
});
export {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};