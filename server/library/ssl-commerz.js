const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
class MakePayment{
  constructor(customer,orderID,currency,manager,amount){
    this.customer={
      cus_name: customer.username,
      cus_email:customer.email,
      cus_country: "BD",
      cus_phone: customer.phoneNumber
    }
    this.order={
      tran_id: orderID,
      currency: currency,
      total_amount: amount,
      multi_card_name: "mastercard"
    }
    this.routes={
      success_url: `http://localhost:8080/api/make-payment/success?oid=${orderID}&lid=${manager._id}&cid=${customer._id}`,
      fail_url: `http://localhost:8080/api/make-payment/fail?oid=${orderID}&lid=${manager._id}&cid=${customer._id}`,
      cancel_url: `http://localhost:8080/api/make-payment/cancel?oid=${orderID}&lid=${manager._id}&cid=${customer._id}`,
      ipn_url: `http://localhost:8080/api/make-payment/ipn?oid=${orderID}&lid=${manager._id}&cid=${customer._id}`
    }
    this.product={
      product_name: "Medical Supplies from "+manager.username,
      product_category: "Laundry",
      product_profile: "general",
    }
    this.shipping={
      shipping_method: "Courier",
      ship_name: customer.username,
      ship_add1: "BD",
      ship_city: "BD",
      ship_state: "BD",
      ship_postcode: "BD",
      ship_country: "BD"
    }
  }

  async makePaymentRequest(){
    const paymentData={...this.customer,...this.order,...this.product,...this.routes,...this.shipping};
    const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false);
    const result=await sslcommer.init(paymentData);
    if(result?.GatewayPageURL){
      return result.GatewayPageURL;
    }
    else{
      throw Error('Could not retrieve Gateway Page URL, due to:  '+result.failedreason);
    }
  }
}

module.exports = {MakePayment};


