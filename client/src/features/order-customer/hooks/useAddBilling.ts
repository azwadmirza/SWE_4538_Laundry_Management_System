import axios from "axios";
import { useState } from "react"

export const useAddBilling=(orderID:string,setShow:React.Dispatch<React.SetStateAction<boolean>>)=>{
  const [paymentOption,setPaymentOption]=useState<string>("cash");

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await axios.patch(import.meta.env.VITE_SERVER+'/api/update-payment',{
      orderID:orderID,
      paymentOption:paymentOption
    },{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    }).then((res)=>{
      setShow(false);
      console.log(res);
      if(res.data.type==="digital"){
        window.location.href=res.data.url;
      }
      else{
        window.location.reload();
      }
    })
    setShow(false);
  }

  return {paymentOption,setPaymentOption,handleSubmit};
}