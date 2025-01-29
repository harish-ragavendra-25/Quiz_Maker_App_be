const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../Models/AdminModel');

//Register new Admin
const adminRegisterFunction = async(req,res) => {
    try {
        const { username,password } = req.body;

        if(!username||!password){
            return res.status(400).json({message:'All fields must be filled'});
        }

        const existingUser = await adminModel.findOne({ username });
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const newUser = new adminModel({
            username,
            password
        })

        newUser.save();

        res.status(201).json({message: `${username.role} - ${username} registered sucessfully`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Something went wrong while registering admin'})
    }
}

//Admin login function

const adminLoginFunction = async(req,res) => {
    try {
        const { username,password } = req.body;

        if(!username||!password){
            return res.status(400).json({message:'All fields are required'});
        }

        const user = await adminModel.findOne({ username });
        if(!user){
            return res.status(404).json({message:`User with ${username} username not found`});
        }

        //compare the password
        const isMatch = await bcrypt.hash(password,user.password);
        if(!isMatch){
            return res.status(404).json({message:'Invalid password credentials'});
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET){
            console.log('JWT_SECRET not defined');
            return res.status(500).json({message:'Server configuration error: Missing JWT_SECRET'});
        }

        //token genration
        const token = jwt.sign(
            {id:user._id,role:user.role},
            JWT_SECRET,
            {expiresIn:'1d'}
        )

        return res.status(200).json({
            message:'login Sucessful',
            token,
            user:{username:user.username,role:user.role}
        });
    } catch (error) {
        console.log('Error during login:',error);
        res.status(500).json({message:'Something went wrong'});

    }
}

module.exports = {adminRegisterFunction,adminLoginFunction};