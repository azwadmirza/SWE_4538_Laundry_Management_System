const mongoose = require('mongoose');
const generateJwt = require('../config/jwt_generator');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    },
    verified:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

customerSchema.statics.signup=async function(user){
    try{
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(user.password,salt);
        const newCustomer=await this.create(user);
        const token=await generateJwt(newCustomer);
        return token;
    }
    catch(error){
        throw error;
    }
}

customerSchema.statics.login=async function(user){
    try{
        const existingUser=await this.findOne({email:user.email});
        if(!existingUser){
            throw new Error("User does not exist");
        }
        const isMatch=await bcrypt.compare(user.password,existingUser.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }

        const token=await generateJwt(existingUser);
        return {token,verified:existingUser.verified};
    }
    catch(error){
        throw error;
    }
}

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
