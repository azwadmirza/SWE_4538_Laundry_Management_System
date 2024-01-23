import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useLogin=()=>{
  const navigate=useNavigate();
  const [userType,setUserType]=useState<string>("manager");
  const [error,setError]=useState<string>();
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>();
  const [submitPassword,setSubmitPassword]=useState<string>("");

  const changePassword=(input:string)=>{
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
  }

  const login=async()=>{
    await axios.post(import.meta.env.VITE_SERVER+"/api/login",{
      email,
      password:submitPassword,
      type:userType
    }).then((res)=>{ 
      console.log(res);
      localStorage.setItem("token",res.data.token); 
      if(res.data && !res.data.verified){
        navigate("/verify");
      }
      else if(res.data){
        if(userType==="manager"){
          navigate("/laundry/profile");
        }
        else{
          navigate("/customer/profile");
        }
      }
      else{
        setError("Server Error");
      
      }
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.error);
    });
  }

  return {userType,setUserType,error,email,setEmail,password,changePassword,login};
}