const User = require('@model/userSchema.js');
const asyncHandler = require('express-async-handler');
const aqp = require('api-query-params');
const mongoose = require('mongoose');

const createUser = asyncHandler(async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData); // Create a new user instance
        const resp = await newUser.createUser(userData); // Call the createUser method on the user instance
        if (resp.success === false) {
            return res.status(400).json({
                success: false,
                message: resp.msg,
            });
        }
        res.json({
            success: true,
            message: 'User Created'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

const updateUser = asyncHandler(async (req, res) => {
    console.log('reading',req.body);
    const success = await req.user.updateUser(req.body, req.user.id);
    if (!success) {
        console.log(success.msg)
        return res.status(400).json({
            success: false,
            message: 'Failed to update user'
        });
    }
    res.status(200).json({
        success: true,
        message: 'User Updated'
    });
});


module.exports = {
    createUser,
    updateUser,
}