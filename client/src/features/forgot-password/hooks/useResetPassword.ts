import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const useResetPassword=(email:string,role:string)=>{
    const navigate=useNavigate();
    const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirmPassword, setErrorCPassword] = useState("");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =useState("password");
  const [isDisabled, setIsDisabled] =useState(false);
  const [submitPassword, setSubmitPassword] = useState("");
  const [userType]=useState<string>(role);

  const passwordChange=(input:string)=>{
    setPassword(input);
    if(input.length<8){
        setErrorPassword("Password should be atleast 8 characters long with numbers, alphabets and special characters");
      }
      else{
        setErrorPassword("");
      }
    setSubmitPassword(CryptoJS.SHA512(input).toString());
    if(input!==password){
      setErrorCPassword("Password does not match");
    }
    else{
        setErrorCPassword("");
    }
  }

  const confirmPasswordChange=(input:string)=>{
    setConfirmPassword(input);
    if(input!==password){
      setErrorCPassword("Password does not match");
    }
    else{
        setErrorCPassword("");
    }
  }

  useEffect(()=>{
    if(errorConfirmPassword==="" && errorPassword===""){
      setIsDisabled(false);
    }
    else{
        setIsDisabled(true);
    }
  },[confirmPasswordChange,passwordChange])



  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log(userType);
    await axios.patch(import.meta.env.VITE_SERVER+`/api/reset/${email}/${userType}`,{
        password:submitPassword
        }).then(()=>{
        navigate('/authentication');
        }).catch((err)=>{
        console.log(err);
        setErrorMessage(err.response.data.error);
    })
  }

  return {password,passwordChange,confirmPassword,confirmPasswordChange,passwordVisibility,confirmPasswordVisibility,setConfirmPasswordVisibility,setPasswordVisibility,handleSubmit,isDisabled,errorPassword,errorMessage,errorConfirmPassword}
}