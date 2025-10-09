import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.json()); //middleware
app.use(express.urlencoded({extended : true}));
app.use(cors());

app.get('/hello',(req,res)=>{
    res.send("Hello world");
})
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`);
})