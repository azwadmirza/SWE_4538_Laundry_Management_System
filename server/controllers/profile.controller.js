const generateJwt = require('../config/jwt_generator');
const Customer = require('../models/customer.model');
const Manager = require('../models/manager.model');



const getCustomerProfileInformation=async(req,res)=>{
    try{
        const customer=await Customer.findById(req.user.id).select('-password');
        res.status(200).json(customer);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const getManagerProfileInformation=async(req,res)=>{
    try{
        const manager=await Manager.findById(req.user.id).select('-password -pricingDetails');
        if(manager.profilePicture){
            
        }
        res.status(200).json(manager);
    }catch(err){
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const updateManagerProfile=async(req,res)=>{
    try{
        const {username,phoneNumber,openingTime,closingTime,address}=req.body;
        const laundry=await Manager.findById(req.user.id).select('-password -pricingDetails');
        laundry.phoneNumber=phoneNumber?phoneNumber:laundry.phoneNumber;
        laundry.username=username?username:laundry.username;
        laundry.openingTime=openingTime?openingTime:laundry.openingTime;
        laundry.closingTime=closingTime?closingTime:laundry.closingTime;
        laundry.address=address?address:laundry.address;
        laundry.profilePicture=req.file?"/uploads/"+req.file.filename:laundry.profilePicture;
        await laundry.save();
        const token=await generateJwt(laundry);
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const updateCustomerProfile=async(req,res)=>{
    try{
        const {username,phoneNumber}=req.body;
        const user=await Customer.findOne(req.user.id).select('-password');
        user.phoneNumber=phoneNumber?phoneNumber:user.phoneNumber;
        user.username=username?username:user.username;
        user.profilePicture=req.file?"/uploads/"+req.file.filename:user.profilePicture;
        await user.save();
        const token=await generateJwt(user);
        res.status(200).json({token});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}






module.exports={
    getCustomerProfileInformation,
    getManagerProfileInformation,
    updateManagerProfile,
    updateCustomerProfile
}
