const Order = require('../models/order.model');
const Manager = require('../models/manager.model');
const Customer = require('../models/customer.model');
const { MakePayment } = require('../library/ssl-commerz');

const addOrder = async (req, res) => {
  try {
    const {
      laundryManagerID, items_raw } = req.body;
    let items = [];
    items_raw.forEach((item) => {
      items.push({
        name: item.ClothType,
        quantity: item.Quantity,
        service: item.Type,
        unitPrice: item[item.Type],
      });
    });
    const customer = await Customer.findById(req.user.id);
    const laundry = await Manager.findById(laundryManagerID);
    const customerProfilePicture = customer.profilePicture;
    const customerName = customer.username;
    const laundryName = laundry.username;
    const laundryProfilePicture = laundry.profilePicture;
    const newOrder = new Order({
      laundryManagerID,
      customerID: req.user.id,
      customerProfilePicture,
      customerName,
      laundryName,
      laundryProfilePicture,
      items
    });
    await newOrder.save();
    return res.status(201).json({ message: 'Order added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const updateStatus = async (req, res) => {
  try {
    const { orderID, status } = req.body;

    const order = await Order.findById(orderID);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersByCustomerID = async (req, res) => {
  try {
    const orders = await Order.find({ customerID: req.user.id });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getOrdersByManagerID = async (req, res) => {
  try {
    const orders = await Order.find({ laundryManagerID: req.user.id });

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const commenceDigitalPayment = async(customer_data,orderID,manager_data,amount)=>{
  try{
    const makePayment=new MakePayment(customer_data,orderID,'BDT',manager_data,amount);
    const result=await makePayment.makePaymentRequest();
    return {paymentSuccessful:true,url:result,type:'digital'};
  }
  catch(error){
    return {paymentSuccessful:false,type:'digital'};
  }
}

const makePayment = async (req, res) => {
  try {
    const { orderID, paymentOption } = req.body;
    const orders = await Order.findById(orderID);
    let ammont=0;
    orders.items.forEach((item)=>{
      ammont+=item.unitPrice*item.quantity;
    });
    if (!orders) {
      return res.status(404).json({ error: 'Order not found' });
    }
    if(paymentOption==="cash"){
      orders.status = "Paid";
      orders.paymentMethod = paymentOption;
      orders.save();
      return res.status(200).json({paymentSuccessful:true,type:'cash'});
    }
    else{
      const customer = await Customer.findById(orders.customerID);
      const manager = await Manager.findById(orders.laundryManagerID);
      const result=await commenceDigitalPayment(customer,orderID,manager,ammont);
      console.log(result);
      if(result.paymentSuccessful){
        orders.status = "Paid";
        orders.paymentMethod = paymentMethod;
        orders.save();
        return res.status(200).json(result);
      }
      else{
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  addOrder,
  makePayment,
  updateStatus,
  getOrdersByCustomerID,
  getOrdersByManagerID
};
