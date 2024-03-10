const User = require('@model/userSchema.js');
const asyncHandler = require('express-async-handler');
const aqp = require('api-query-params');
const login = asyncHandler(async (req, res) => {
    res.status(200).json({
            success: true,
            message: 'Login Successful'
        });
    
});
const ping = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Ping Successful'
    });
});

const verifyEmail = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Email Verified'
    });

})

const forgotPassword = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email'
    });
})
const resetPassword = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Password reset successfully'
    });
})
module.exports = {
    login,
    ping,
    verifyEmail,
    forgotPassword,
    resetPassword
}