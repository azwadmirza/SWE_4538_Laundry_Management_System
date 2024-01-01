import { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const useSignUp=()=>{
  const navigate=useNavigate();
  const [userType,setUserType]=useState<string>("customer");
  const [username, setUsername]=useState<string>();
  const [error,setError]=useState<string>();
  const [errorPassword,setErrorPassword]=useState<string>();
  const [errorConfirmPassword,setErrorConfirmPassword]=useState<string>();
  const [email,setEmail]=useState<string>();
  const [password,setPassword]=useState<string>();
  const [confirmPassword,setConfirmPassword]=useState<string>();
  const [submitPassword,setSubmitPassword]=useState<string>();
  
  const changePassword=(input:string)=>{
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
  }

  const changeConfirmPassword=(input:string)=>{
    setConfirmPassword(input);
  }

  const signup=async()=>{
    await axios.post(import.meta.env.VITE_SERVER+'/api/signup',{
      username:username,
      email:email,
      password:submitPassword,
      type:userType
    }).then((res)=>{
      console.log(res);
      localStorage.setItem("token",res.data.token);
      navigate(`/${userType}/signup`);
    }).catch((err)=>{
      console.log(err);
      setError(err.response.data.error);
    })
  }

  return {error,userType,setUserType,username,setUsername,email,setEmail,password,changePassword,confirmPassword,changeConfirmPassword,errorPassword,errorConfirmPassword,signup};
}