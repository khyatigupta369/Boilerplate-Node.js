const User = require('@model/userSchema.js');
const asyncHandler = require('express-async-handler');
const aqp = require('api-query-params');
const login = asyncHandler(async (req, res) => {
    const {
        email,
        password,
    } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            success: false,
            message: 'User not found or email not verified'
        });
    }
    // customer verification
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(400).json({
            success: false,
            message: 'Invalid Password'
        });
    }
    // generate token
    const accessToken = await user.generateAuthToken();
    user.last_login=new Date();
    await user.save();
    res.status(200).json({
            success: true,
            message: 'Login Successful',
            data:{
                accessToken,
                user
            }
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