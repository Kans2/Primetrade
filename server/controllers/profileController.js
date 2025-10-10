// profileController.js
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';


// Helper function to catch errors in async routes and pass them to Express error handler
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        // Log the error for server-side inspection
        console.error(err.message);
        // Send a generic 500 status back to the client
        res.status(500).json({ msg: err.message });
    });
};

// @route   GET /api/profile
// @desc    Fetch user details (excluding password)
// @access  Private (Auth protected)
const getProfile = asyncHandler(async (req, res) => {
    // req.user.id is populated by auth middleware
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
        return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
});

// @route   PUT /api/profile
// @desc    Update user info (name, email, password)
// @access  Private (Auth protected)
const updateProfile = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;

    // If password is provided, hash it before saving (CRITICAL SECURITY STEP)
    if (password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(password, salt);
    }

    // Find and update the user by ID
    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
        new: true, // Return the new document
    }).select('-password'); // Exclude the password from the response

    res.json(user);
});

export {getProfile,updateProfile};