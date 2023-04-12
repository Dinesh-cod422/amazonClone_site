const Errorhandler = require("../utils/errorhandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

exports.isAuthenticatedUser = catchAsyncError( async (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return next (new Errorhandler('Login First to handle this Resource', 401))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decode.id)
    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next (new Errorhandler(`Role ${req.user.role} is not allowed`, 401))
        }
        next();
    }
}