import express, { urlencoded } from 'express';
import {connectToDb} from "../database/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from '../routes/authRoute.js';
import taskRoutes from '../routes/taskRoutes.js';
import profileRoutes from '../routes/profileRoute.js';
// loading environment variables from .env before using them
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json()); //middleware
app.use(express.urlencoded({extended : true}));
app.use(cors());


app.use('/api/auth',authRoutes);
app.use('/api/tasks',taskRoutes);
app.use('/api/profile', profileRoutes);

app.get('/hello',(req,res)=>{
    res.json({message:"Checking"});
})

connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
