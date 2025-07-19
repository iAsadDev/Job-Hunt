const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


// Register route
router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({message: "Please fill all fields"});
    }
    try{
        let user =  await User.findOne({email});
        if (user) return res.status(400).json({msg: "User already exists"})
        
        user =  new User({name, email , password});
        user.password = await bcrypt.hash(password, 10);
        await user.save();

        const payload = {user: {id:  user.id}}
        const token =  jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});

    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error", err);
    }
});

// Login route
router.post('/login', async (req, res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json({message: "Please fill all fields"});
    }
    
    try{
        let user = await User.findOne({email});
        if (!user) return res.status(400).json({msg: "Invalid credentials"});
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});
        const payload = { id: user.id }; // ✅ flat payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'}); 
        res.json({token});
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send("Server error", err);
    }
})
// protected Route
router.get('/', authMiddleware , async (req, res) => {
    res.json({msg: "Welcome to the protected route", userId: req.user.id});
})
module.exports =  router;