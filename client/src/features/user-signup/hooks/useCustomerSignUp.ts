import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useCustomerSignUp=()=>{
  const [phone_number,setPhoneNumber]=useState<string>("");
  const navigate=useNavigate();
  const [loading,isLoading]=useState(false);
  const [error,setError]=useState("");
  const [imageURL,setImageURL]=useState<String>("/customerProfilePicture.jpg");
  const [image,setImage]=useState<File>();
  useEffect(()=>{
    if(image){
      const reader=new FileReader();
      isLoading(true);
      reader.readAsDataURL(image);
      reader.onloadend=()=>{
        if(typeof reader.result==="string"){
          setImageURL(reader.result);
        }
        else{
          setImageURL("/customerProfilePicture.jpg")
        }
      }
      isLoading(false);
    }
  },[image]);

  const signup=async()=>{
      isLoading(true);
      const formData=new FormData();
      formData.append("phoneNumber",phone_number);
      formData.append("profilePicture",image as Blob);
      await axios.post(import.meta.env.VITE_SERVER+"/api/customer/signup",formData,{
        headers:{
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${localStorage.getItem("token")}`,
        }
      }).then((res)=>{
        localStorage.setItem("token",res.data.token);
        navigate("/verify");
      }).catch((err)=>{
        setError(err.response.data.message);
      }
      );
      isLoading(false);
  }

  return {imageURL,setImage,phone_number,setPhoneNumber,loading,error,setError,signup};
}
 
export default useCustomerSignUp;