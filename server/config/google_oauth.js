const { OAuth2Client } = require("google-auth-library");
const axios = require('axios');

const oAuth2Client = new OAuth2Client(
  process.env._GOOGLE_CLIENT_ID,
  process.env._GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const verifyJWT=async(token)=>{
    try {
      const ticket = await oAuth2Client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      return payload;
    } catch (error) {
      console.error('Error verifying JWT:', error);
    }
  }

  module.exports = {verifyJWT,oAuth2Client};