const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userBody = {
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    mobile_number: {
      type: Number,
      required: false
    },
    dob: {
      type: Date,
      required: false
    },
    anniversary: {
      type: Date,
      required: false
    },
    type: { 
      type: String, 
      enum: ['user', 'admin'],
      required: true,
      index: true,
      default: "user"
    },
    last_login: {
      type: Date,
      default: null
    },
    pincode: {
      type: Number,
      required: false
    },
    is_email_verified: {
      type: Boolean,
      default: false
    },
    email_verification_token: {
      type: String,
      required: false
    },
    reset_password_token:{
      type: String,
      required: false
    }
  };
const userSchema = mongoose.Schema(userBody, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    console.log("password is modified")
    this.password=await bcrypt.hash(this.password,12);
    next();
})

userSchema.post('save', async function () {
})
const params={
}
require("@model_method/userSchemaMethods/helper_methods")(userSchema, params);
const User = mongoose.model('Users', userSchema)
module.exports = User
