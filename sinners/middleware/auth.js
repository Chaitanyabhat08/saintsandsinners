const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('./asyncError');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
const { resolve } = require('path');

const result = config({ path: resolve(__dirname, '../config/.env') });
const userModel = require('../models/user');
if (result.error) {
    console.log(result.error);
}

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler("Please login or signup to access this page"));
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(decodedData.id);
    next();
});

module.exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
           return next( new ErrorHandler(`Role ${req.user.role} is not authorised`,403));
        }
        next();
    };
};