import { useEffect, useState } from "react";
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
  const [isDisabled,setIsDisabled]=useState<boolean>(true);
  
  const changePassword=(input:string)=>{
    if(input.length<8){
      setErrorPassword("Password should be atleast 8 characters long with numbers, alphabets and special characters");
    }
    else{
      setErrorPassword("");
    }
    setPassword(input);
    setSubmitPassword(CryptoJS.SHA512(input).toString());
    if(input!==confirmPassword){
      setErrorConfirmPassword("Password does not match");
    }
    else{
      setErrorConfirmPassword("");
    }
  }

  const changeConfirmPassword=(input:string)=>{
    setConfirmPassword(input);
    if(input!==password){
      setErrorConfirmPassword("Password does not match");
    }
    else{
      setErrorConfirmPassword("");
    }
  }

  useEffect(()=>{
    if(errorConfirmPassword==="" && errorPassword===""){
      setIsDisabled(false);
    }
    else{
        setIsDisabled(true);
    }
  },[changeConfirmPassword,changePassword])

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

  return {isDisabled,error,userType,setUserType,username,setUsername,email,setEmail,password,changePassword,confirmPassword,changeConfirmPassword,errorPassword,errorConfirmPassword,signup};
}