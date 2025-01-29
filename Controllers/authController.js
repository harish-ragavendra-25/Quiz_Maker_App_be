const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/UserModel');


//Register a New User
const registerFunction = async(req,res) => {
    try {
        const { username,password } = req.body;
        
        if(!username||!password){
            return res.status(400).json({message:'All fields are requried'});
        }

        //checking existing user
        const existUser = await userModel.findOne({ username });
        if(existUser){
            return res.status(400).json({message:'User already exists!!'});
        }

        //create new User
        const newUser = new userModel({
            username,
            password
        });

        await newUser.save();

        res.status(201).json({message: `${newUser.role} - ${newUser.username} registered sucessfully`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went Wrong while registering'});
    }
};

//login the user
const loginFunction = async(req,res) => {
    try {
        const { username,password } = req.body;

        if(!username||!password){
            return res.status(400).json({message:'Include both Username and Password'});
        }

        //find the user
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(404).json({message:`User with the ${username} not found`});
        }

        //compare the password
        const isMatch = await bcrypt.hash(password,user.password);
        if(!isMatch){
            return res.status(404).json({message: 'Invalid credentials'});
        }

        
        const JWT_Secret = process.env.JWT_SECRET;
        if(!JWT_Secret){
            console.log('JWT_SECRET not defined');
            return res.status(500).json({message:'Server configuration error: Missing JWT_SECRET'});
        }

        //Generate JWT token
        const token = jwt.sign(
            {id:user._id,role:user.role},
             JWT_Secret,
            { expiresIn: '1d'}
        );

        res.status(200).json({
            message: `Login Sucessful`,
            token,
            user: {username:user.username,role:user.role}
        });

    } catch (error) {
        console.log('Error during login:',error);
        res.status(500).json({message: 'something went wrong'});
    }
}

module.exports = {registerFunction,loginFunction};