// profileRoutes.js
import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';


const router = express.Router();


// 🔒 Protect all routes below using the auth middleware
router.use(verifyToken);

// 📄 GET / (Fetch user details)
router.get('/', getProfile);

// ✏️ PUT / (Update user info)
router.put('/', updateProfile);


export default router;