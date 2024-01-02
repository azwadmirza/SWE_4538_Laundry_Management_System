const Promotional = require("../models/promotional.model")

const promotionalUpload=async(req,res)=>{
    try{
        const promotional=await Promotional.findOne({managerID:req.user.id});
    if(promotional){
        promotional.video=req.file?"http://localhost:8080/uploads/"+req.file.filename:promotional.video;
        await promotional.save();
        res.status(200).json({msg:"Promotional video updated successfully"});
    }
    else{
        const promotional=new Promotional({
            managerID:req.user.id,
            video:req.file?"http://localhost:8080/uploads/"+req.file.filename:null
        });
        await promotional.save();
        res.status(200).json({msg:"Promotional video uploaded successfully"});
    }
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

const getVideo = async (req, res) => {
    try {
        const {id}=req.params;
        const promotional = await Promotional.findOne({ managerID: id });
        if (promotional) {
            res.status(200).json({ video: promotional.video });
        } else {
            res.status(404).json({ error: "Promotional video not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { promotionalUpload, getVideo };