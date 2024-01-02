const generateJwt = require('../config/jwt_generator');
const customer = require('../models/customer.model');
const manager = require('../models/manager.model');
const Otp = require('../models/otp.model');
const SMTPClient = require('../utils/smtp');
const bcrypt = require('bcrypt');

const postSignUp = async (req, res) => {
    try {
        const { type } = req.body;
        const user = { email: req.body.email, password: req.body.password, username: req.body.username };
        if (type == "customer") {
            const token = await customer.signup(user);
            res.status(200).json({ token });
        }
        else if (type == "manager") {
            const token = await manager.signup(user);
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ error: "Invalid type" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postLogin = async (req, res) => {
    try {
        const { type } = req.body;
        const user = { email: req.body.email, password: req.body.password };
        if (type == "customer") {
            const {token,verified} = await customer.login(user);
            res.status(200).json({ token,verified });
        }
        else if (type == "manager") {
            const {token,verified} = await manager.login(user);
            res.status(200).json({ token,verified });
        }
        else {
            res.status(400).json({ error: "Invalid type" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const customerSignUp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const Customer = await customer.findById(req.user.id)
        if (!Customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        Customer.phoneNumber = phoneNumber;
        Customer.profilePicture = req.file ? req.file.filename : Customer.profilePicture;
        await Customer.save();
        const token = await generateJwt(Customer);
        res.status(200).json({ token ,role:'customer'});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const managerSignUp = async (req, res) => {
    try {
        const { phoneNumber, openingTime, closingTime, address } = req.body;
        const Manager = await manager.findById(req.user.id)
        Manager.phoneNumber = phoneNumber;
        Manager.openingTime = openingTime;
        Manager.closingTime = closingTime;
        Manager.address = address;
        Manager.profilePicture = req.file ? req.file.filename : Manager.profilePicture;
        await Manager.save();
        const token = await generateJwt(Manager);
        res.status(200).json({ token ,role:'manager'});
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const Customer = await customer.findById(req.user.id);
        const Manager = await manager.findById(req.user.id);
        if(Customer){
            const mailer = new SMTPClient(Customer.email);
            const otp=mailer.generateOTP();
            await Otp.create({user_id:req.user.id,otp});
            mailer.generateMail();
            mailer.sendVerificationMail();
            res.status(200).json({ success: true });
        }
        else if(Manager){
            const mailer = new SMTPClient(Manager.email);
            const otp=mailer.generateOTP();
            await Otp.create({user_id:req.user.id,otp});
            mailer.generateMail();
            mailer.sendVerificationMail();
            res.status(200).json({ success: true });
        }
        else{
            throw new Error("User not found");
        }
    }
    catch (error) {
        if (error.message == "User not found") {
            res.status(404).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
}

const verifyOTP = async (req, res) => {
    const { otp } = req.body;
    try {
        await Otp.verify(req.user.id, otp);
        const Customer=await customer.findById(req.user.id);
        const Manager=await manager.findById(req.user.id);
        if(Customer){
            Customer.verified=true;
            await Customer.save();
            const token=await generateJwt(Customer);
            res.status(200).json({ token:token,role:'customer' });
        }
        else if(Manager){
            Manager.verified=true;
            await Manager.save();
            const token=await generateJwt(Manager);
            res.status(200).json({ token:token,role:'laundry'});
        }
        else{
            throw new Error("User not found");
        }

    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const forgotPassword=async(req,res)=>{
    try{
        const {email}=req.params;
        const mailer = new SMTPClient(email);
        const otp=mailer.generateOTP();
        await Otp.create({email:email,otp});
        mailer.generateMail();
        mailer.sendVerificationMail();
        res.status(200).json({ success: true });
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

const verifyForgotOTP=async(req,res)=>{
    try{
        const {email}=req.params;
        const { otp } = req.body;
        await Otp.verifyEmail(email, otp);
        res.status(200).json({ success: true });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
}

const resetPassword=async(req,res)=>{
    try{
        const {email,role}=req.params;
        const { password } = req.body;
        if(role==="customer"){
            const Customer=await customer.findOne({email});
            if(Customer.googleId){
                return res.status(400).json({ error: "Cannot reset password, oAuth used" });
            }
            const salt=await bcrypt.genSalt(10);
            Customer.password=await bcrypt.hash(password,salt);
            await Customer.save();
            return res.status(200).json({ success: true });
        }
        else if(role==="manager"){
            const Manager=await manager.findOne({email});
            if(Manager.googleId){
                return res.status(400).json({ error: "Cannot reset password, oAuth used" });
            }
            const salt=await bcrypt.genSalt(10);
            Manager.password=await bcrypt.hash(password,salt);
            await Manager.save();
            return res.status(200).json({ success: true });
        }
        else{
            return res.status(400).json({ error: "Invalid role" });
        }
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}

const googleLogin=async(req,res)=>{
    const {code,role}=req.body;
    console.log(code);

}


module.exports = { postSignUp, googleLogin,postLogin, customerSignUp, managerSignUp, verifyEmail, verifyOTP,forgotPassword,verifyForgotOTP,resetPassword };
