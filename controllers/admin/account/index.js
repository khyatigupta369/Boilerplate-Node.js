const asyncHandler = require('express-async-handler');
const User=require('@model/userSchema.js');
const aqp = require('api-query-params');


const addAdminUser = asyncHandler(async (req, res) => {
    try{
        const {
            email,
            name,
            password,
            type,
        }=req.body;
        const admin=await User.create({
            email,
            name,
            password,
            type
        });
        res.status(200).json({
            success: true,
            message: `${type} User Created`,
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
});

const deleteAdminUser = asyncHandler(async (req, res) => {
    try{
        const admin_id = req.params.id;
        await User.findByIdAndDelete(admin_id);
        res.status(200).json({
            success: true,
            message: 'Admin User Deleted'
        });
    }
    catch(error){
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

const getUsers= asyncHandler(async (req, res) => {
    const custom_query = req.query;
    let {
        filter,
        skip,
        limit,
        sort,
        projection,
        populate
    } = aqp({
        skip: req.page * req.perPage,
        ...custom_query
    });
    const users = await User
    .find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select("-password")
    .populate(populate);
    res.status(200).json({
        success: true,
        data: users
    });
});

const updateUser = asyncHandler(async (req, res) => {
    const success=await req.admin.updateUser(req.body,req.params.id);
    if(success.payload==false){
        return res.status(400).json({
            success: false,
            message: success.msg,
        });
    }
    res.status(200).json({
        success: success,
        message: 'User Updated'
    });
})

const deleteUser = asyncHandler(async (req, res) => {
console.log(req.admin._id,"req.admin._id")
if(req.admin._id==req.params.id){
    return res.status(400).json({
        success: false,
        message: 'You can not delete yourself',
    });
}
const user=await User.findOneAndDelete({_id:req.params.id});
if(!user){
    return res.status(404).json({
        success: false,
        message: 'User not found',
    });
}
res.status(200).json({
    success: true,
    message: 'User Deleted'
});
})

module.exports={
    addAdminUser,
    deleteAdminUser,
    getUsers,
    updateUser,
    deleteUser
}