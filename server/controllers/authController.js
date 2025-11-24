import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

// Register
const register =  async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' });

        const exists = await User.findOne({ email });

        if (exists) return res.status(400).json({ msg: "A user with this email already exists."});

        const salt = await bcrypt.genSalt(10);

        const hashed = await bcrypt.hash(password, salt);

        const user = await User.create({
             name,
             email, 
             password: hashed 
            });



        res.status(200).json({ message: "User created successfully", user: {  name: user.name, email: user.email } });
    } catch (err){
        return res.status(500).json({ message: "An unexpected error occurred. Please try again." });
    }
};

// Login
const login =  async (req,res)=>{
  try{

    const { email, password } = req.body;

    if ( !email || !password) return res.status(400).json({ msg: 'Missing fields' });

    const user = await User.findOne({ email });

    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);

    if(!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ message: "Login successful",token});

  }catch(err){ res.status(500).json({ msg: err.message }); }
};

export  {register, login};