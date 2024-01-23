const Manager = require('../models/manager.model');

const getAllLaundries= async (req, res) => {
  try {
    const laundries = await Manager.find().select('_id username address profilePicture');
    
    return res.status(200).json({ laundries });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



const addPricingDetails = async (req, res) => {
  try {
    const { pricing } = req.body;
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    const existingPricing = manager.pricingDetails.find(detail => detail.ClothType === pricing.ClothType);
    if (existingPricing) {
      return res.status(500).json({ error: 'Cloth already exists' });
    }
    
    manager.pricingDetails.push(pricing);
    await manager.save();

    return res.status(201).json({ message: 'Pricing details added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updatePricingDetails = async (req, res) => {
  try {
    const {pricing } = req.body;
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    const pricingDetail = manager.pricingDetails;
    if (!pricingDetail) {
      return res.status(404).json({ error: 'Pricing details not found' });
    }
    manager.pricingDetails=pricing;
    await manager.save();
    return res.status(200).json({ message: 'Pricing details updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const deletePricingDetails = async (req, res) => {
  try {
    const { pricingDetailsID } = req.params;
    const manager = await Manager.findById(req.user.id);
    if (!manager) {
      return res.status(404).json({ error: 'Manager not found' });
    }
    manager.pricingDetails.id(pricingDetailsID).remove();
    await manager.save();

    return res.status(200).json({ message: 'Pricing details deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPricingDetails=async(req,res)=>{
    try{
        const pricing=await Manager.findById(req.user.id).select('pricingDetails');
        res.status(200).json(pricing);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const getLaundryDetails=async(req,res)=>{
    try{
        const laundry=await Manager.findById(req.params.id).select('username profilePicture pricingDetails');
        res.status(200).json(laundry);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}


module.exports = {
  getAllLaundries,
  addPricingDetails,
  updatePricingDetails,
  deletePricingDetails,
  getLaundryDetails,
  getPricingDetails
};
