const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');

const saltNum = parseInt(process.env.saltNum,10);

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    }},
    {
        timestamps:true
    }
);

AdminSchema.pre('save',async function(next) {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,saltNum);
    };
    next();
})

const adminModel = mongoose.model('adminModel',AdminSchema);

module.exports = adminModel;