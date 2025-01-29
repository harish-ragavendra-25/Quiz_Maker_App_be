const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');

const saltNum = parseInt(process.env.saltNum,10);

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user"
    }
},
{
    timestamps:true
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,saltNum);
    }
})

const userModel = mongoose.model('userModel',userSchema);

module.exports = userModel;