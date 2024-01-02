const mongoose = require('mongoose');
const generateJwt = require('../config/jwt_generator');
const bcrypt=require('bcrypt');

const managerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: { //Here username is laundry name
        type: String,
        required: true
    },
    phoneNumber: {
        type: String
    },
    profilePicture: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png"
    },
    address:{
        type:String,
    },
    openingTime:{
        type:String,
    },
    closingTime:{
        type:String,
    },
    verified:{
        type:Boolean,
        default:true
    },
    pricingDetails: [{
        ClothType: {
            type: String,
            required: true
        },
        Wash: {
            type: Number,
        },
        Iron: {
            type: Number,
        },
        WashAndIron: {
            type: Number,
        },
        DryClean: {
            type: Number,
        }
    }]
},{timestamps:true});

managerSchema.statics.signup=async function(user){
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

managerSchema.statics.googleSignup=async function(user){
    try{
        const newManager=await this.create(user);
        const token=await generateJwt(newManager);
        return token;
    }
    catch(error){
        throw error;
    }
}

managerSchema.statics.googleLogin=async function(user){
    try{
        const existingUser=await this.findOne({email:user.email,googleId:user.googleId});
        const token=await generateJwt(existingUser);
        return token;
    }
    catch(error){
        throw error;
    }
}

managerSchema.statics.login=async function(user){
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



const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
