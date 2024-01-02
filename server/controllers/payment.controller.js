const Order=require('../models/order.model');

const successfulPayment=async (req,res)=>{
  const {oid}=req.query;
  const orders=await Order.findById(oid);
  orders.status="Completed";
  await orders.save();
  return res.redirect(`http://localhost:5173/customer/order?paymentStatus=success`);
}

const failedPayment=(req,res)=>{
  const {oid,lid,cid}=req.query;
  return res.redirect(`http://localhost:5173/customer/order?paymentStatus=failed&oid=${oid}`);
}

const instantPaymentNotification=(req,res)=>{
  const {oid,lid,cid}=req.query;
  return res.redirect(`http://localhost:3000/checkOutPage?paymentStatus=ipn&oid=${oid}`);
}

const cancelPayment=(req,res)=>{
    const {oid,lid,cid}=req.query;
    return res.redirect(`http://localhost:5173/customer/order?paymentStatus=cancelled&oid=${oid}`);
}


module.exports = {successfulPayment,failedPayment,instantPaymentNotification,cancelPayment};