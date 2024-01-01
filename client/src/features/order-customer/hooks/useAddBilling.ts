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
    })
    setShow(false);
  }

  return {paymentOption,setPaymentOption,handleSubmit};
}