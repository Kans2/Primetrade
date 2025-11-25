// profileRoutes.js
import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';


const router = express.Router();




// 📄 GET / (Fetch user details)
router.get('/',verifyToken, getProfile);

// ✏️ PUT / (Update user info)
router.put('/',verifyToken,updateProfile);


export default router;