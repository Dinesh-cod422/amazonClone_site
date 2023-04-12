const mongoose = require('mongoose');
const validator = require('validator');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Enter name']
    },
    email: {
        type: String,
        required: [true, 'Please Enter email'],
        unique: true,
        validate: [validator.isEmail, 'Please Enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter password'],
        maxlength: [6, 'Password Cannot exceed 6 characters'],
        select: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordTokenExpire: Date,
    createAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    this.password = await bycrpt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function() {
   return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword) {
   return bycrpt.compare(enteredPassword, this.password) 
}


userSchema.methods.getResetToken = function(){
    //Generate Token 
  const token = crypto.randomBytes(20).toString('hex');
   
  //Generate Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  //Set token expires time
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token
}

let model = mongoose.model('user', userSchema)

 module.exports = model;