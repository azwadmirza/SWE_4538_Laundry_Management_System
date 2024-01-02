const axios = require('axios');
const { oAuth2Client } = require('../config/google_oauth');
const { UserRefreshClient } = require('google-auth-library');
const clientId = process.env._GOOGLE_CLIENT_ID;
const clientSecret = process.env._GOOGLE_CLIENT_SECRET;
const Customer=require('../models/customer.model');
const Manager=require('../models/manager.model');

const googleAuthGetToken = async (req, res) => {
  try {
    const {code,role}=req.body;
    const { tokens } = await oAuth2Client.getToken(code);
    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })
      .then((res) => res.data).catch((error)=>console.log(error));
    if(role==='customer'){
      const googleId=userInfo.sub;
      const email=userInfo.email;
      const username=userInfo.name;
      const profilePicture=userInfo.picture;
      const customer=await Customer.findOne({googleId:googleId});
      if(customer){
        const token=await Customer.googleLogin({googleId,email});
        return res.status(200).json({token,mode:'login'});
      }
      else{
        const token=await Customer.googleSignup({googleId,email,username,profilePicture,verified:true});
        return res.status(200).json({token,mode:'signup'});
      }
    }
    else if(role==='manager'){
      const googleId=userInfo.sub;
      const email=userInfo.email;
      const username=userInfo.name;
      const profilePicture=userInfo.picture;
      const manager=await Manager.findOne({googleId:googleId});
      if(manager){
        const token=await Manager.googleLogin({googleId,email});
        return res.status(200).json({token,mode:'login'});
      }
      else{
        const token=await Manager.googleSignup({googleId,email,username,profilePicture,verified:true});
        return res.status(200).json({token,mode:'signup'});
      }
    }
    else{
      return res.status(400).json({ success: false, error: 'Invalid Role' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

const googleAuthRefreshToken = async (req, res) => {
  try{
    const user = new UserRefreshClient(
      clientId,
      clientSecret,
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken();
    res.status(200).json({credentials});
  }
  catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  googleAuthGetToken,
  googleAuthRefreshToken
};