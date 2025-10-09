import express, { urlencoded } from 'express';
import {connectToDb} from "../database/db.js";
import dotenv from 'dotenv';
import cors from 'cors';

// loading environment variables from .env before using them
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json()); //middleware
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.get('/hello',(req,res)=>{
    res.send("Hello world");
})

connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
