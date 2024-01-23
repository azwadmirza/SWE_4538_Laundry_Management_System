import axios from "axios";
import { useEffect, useState } from "react";

export const useLaundryForm=()=>{
  const [username,setUsername]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [phone,setPhoneNumber]=useState<string>("");
  const [isLoading,setIsLoading]=useState<boolean>(false);
  const [error,setError]=useState<string>();
  const [openingTime,setOpeningTime]=useState<string>("");
  const [closingTime,setClosingTime]=useState<string>("");
  const [address,setAddress]=useState<string>("");

  const [imageURL,setImageURL]=useState<String>("/customerProfilePicture.jpg");
  const [image,setImage]=useState<File>();

  const retrieveLaundryData=async()=>{
    setIsLoading(true);
    await axios.get(import.meta.env.VITE_SERVER+"/api/manager/profile",{
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }
    }).then((res)=>{
      console.log(res.data);
      const {username,phoneNumber,profilePicture}=res.data;
      setUsername(username);
      setPhoneNumber(phoneNumber);
      setAddress(res.data.address);
      setOpeningTime(res.data.openingTime);
      setClosingTime(res.data.closingTime);
      setImageURL(profilePicture);
    }
    ).catch((err)=>{
      console.log(err);
      setError(err.response.data);
    });
    setIsLoading(false);
  }

  useEffect(()=>{
    retrieveLaundryData();
  },[]);




  
  useEffect(()=>{
    if(image){
      const reader=new FileReader();
      setIsLoading(true);
      reader.readAsDataURL(image);
      reader.onloadend=()=>{
        if(typeof reader.result==="string"){
          setImageURL(reader.result);
        }
        else{
          setImageURL("/customerProfilePicture.jpg")
        }
      }
      setIsLoading(false);
    }
  },[image]);

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setIsLoading(true);
    const formData=new FormData();
    formData.append("username",username);
    formData.append("phoneNumber",phone);
    formData.append("profilePicture",image as Blob);
    formData.append("address",address);
    formData.append("openingTime",openingTime);
    formData.append("closingTime",closingTime);
    await axios.patch(import.meta.env.VITE_SERVER+"/api/manager/profile",formData,{
      headers:{
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${localStorage.getItem("token")}`,
      }
    }).then((res)=>{
      localStorage.setItem("token",res.data.token);
    }).catch((err)=>{
      setError(err.response.data.error);
    });
    setIsLoading(false);
  }

  return {imageURL,setImage,openingTime,setOpeningTime,closingTime,setClosingTime,address,setAddress,username,setUsername,password,setPassword,phone,setPhoneNumber,isLoading,error,handleSubmit};
}

export default useLaundryForm;