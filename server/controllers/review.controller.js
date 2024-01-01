const Customer = require('../models/customer.model');
const customer = require('../models/customer.model');
const Manager = require('../models/manager.model');
const manager = require('../models/manager.model');
const Review = require('../models/review.model');

const updateReview=async(req,res)=>{
  try{
    const {managerID,review,rev_stars}=req.body;
    const existingReview=await Review.findOne({managerID:managerID,customerID:req.user.id});
    if(!existingReview){
      return res.status(404).json({error:"Review not found"});
    }
    const manager=await Manager.findById(managerID);
    const customer=await Customer.findById(req.user.id);
    existingReview.review=review;
    existingReview.rev_stars=rev_stars;
    existingReview.customerProfilePicture=customer.profilePicture;
    existingReview.managerProfilePicture=manager.profilePicture;
    await existingReview.save();
    return res.status(200).json({message:"Review updated successfully"});
  }catch(error){
    console.error(error);
    return res.status(500).json({error:"Internal Server Error"});
  }
}

const getReviewerInformation=async(req,res)=>{
  try{
    const customer=await Customer.findById(req.user.id).select('username profilePicture email');
    return res.status(200).json(customer);
  }
  catch(error){
    console.log(error);
    return res.status(500).json({error:"Internal Server Error"});
  }
}


const addReview=async(req,res)=>{
  try{
    const {
      managerID,
      review,
      rev_stars
    } = req.body;
    const customerID = req.user.id;
    const Customer = await customer.findById(customerID);
    const Manager = await manager.findById(managerID);
    const newReview = new Review({
      customerID,
      customerProfilePicture:Customer.profilePicture,
      managerID,
      managerProfilePicture:Manager.profilePicture,
      customerName:Customer.username,
      laundryName:Manager.username,
      review,
      rev_stars
    });
    await newReview.save();
    return res.status(201).json({ message: 'Review added successfully' });
  }catch(error){
    console.error(error);
    return res.status(500).json({error:"Internal Server Error"});
  }
}


const getCustomerReview = async (req, res) => {
  try {
    const {id}=req.params;
    const reviews = await Review.findOne({ customerID:req.user.id,managerID:id }).select('customerProfilePicture customerName rev_stars review');
    if(reviews){
      return res.status(200).json({review:reviews.review,rev_stars:reviews.rev_stars,reviewID:reviews._id,customerName:reviews.customerName,customerID:reviews.customerID,customerProfilePicture:reviews.customerProfilePicture,reviewed:true});
    }
    else{
      const customer=await Customer.findById(req.user.id);
      return res.status(200).json({message:"No review found",profilePicture:customer.profilePicture,reviewed:false});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOtherCustomerReviews=async(req,res)=>{
  try{
    const {id}=req.params;
    const reviews=await Review.find({ managerID: id}).select('customerProfilePicture customerName rev_stars review');
    return res.status(200).json(reviews);
  }catch(error){
    console.error(error);
    return res.status(500).json({error:"Internal Server Error"});
  }
}


const getManagerReviews = async (req, res) => {
  try {

    const reviews = await Review.find({ managerID:req.user.id }).select('customerProfilePicture customerName rev_stars review');
    let average_review=0;
    for(let i=0;i<reviews.length;i++){
      average_review+=reviews[i].rev_stars;
    }
    const manager=await Manager.findById(req.user.id);
    average_review/=reviews.length;
    return res.status(200).json({reviews,average_review,managerName:manager.username,managerProfilePicture:manager.profilePicture});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addReview,
  updateReview,
  getCustomerReview,
  getOtherCustomerReviews,
  getManagerReviews,
  getReviewerInformation
};
