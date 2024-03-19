const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = function (userSchema, ex_params) {
    userSchema.methods.generateRefreshToken = async function () {
        const refreshToken = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRE
        });
        return refreshToken;
    }
    userSchema.methods.generateAuthToken = async function () {
        return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
    }
    userSchema.methods.comparePassword=async function(enteredpassword){
        return await bcrypt.compare(enteredpassword,this.password);
    }

    userSchema.methods.liteInfo=async function(){
        const {
            _id,
            email,
            name,
            type,
            pincode,
            last_login,
        }=this;
        return {
            _id,
            email,
            name,
            type,
            pincode,
            last_login,
        }
    }

    
    userSchema.methods.createUser = async function(payload) {
        const {
            email,
            name,
            type,
            mobile_number,
            pincode,
            last_login,
            password
        } = payload;
        
        const User= this.model('Users');
    
        let resp = {
            success: true,
            msg: "User Created"
        };
    
        const session = await User.startSession();
        session.startTransaction();
    
        try {
            // Create the user
            const newUser = await User.create({
                email: email,
                name: name,
                type: 'user',
                mobile_number: mobile_number,
                password: password,
            });
    
            await session.commitTransaction();
        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            resp = {
                success: false,
                msg: error.message
            };
        } finally {
            session.endSession();
            return resp;
        }
    }
    
    userSchema.methods.updateUser=async function(payload,user_id){
        const User= mongoose.model('Users');
        const user=await User.findOne({_id:user_id});
        const success={
            payload:true,
            msg:'User Updated'
        }
        if(!user){
            success.payload=false;
            success.msg='User not found';
            return success;
        }
        try{
            Object.keys(payload).forEach((key)=>{
                    user[key]=payload[key];
                
            });
            await user.save();
            return success;
        }
        catch(error){
            console.log(error);
            success.payload=false;
            success.msg=error.message;
            return success;
        }
        

    }

}