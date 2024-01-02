import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useGoogleLogin } from "@react-oauth/google";

export const useGoogleContinue=()=>{
    const navigate=useNavigate();
    const [errorGoogle,setError] = useState("");
    const [isLoadingGoogle, setisLoading] = useState(false);
    const [role,setRole]=useState("customer");
    const googleLogin=useGoogleLogin({
      onSuccess: async ({ code }:{
        code:string
      }) => {
        setisLoading(true);
        await axios.post(import.meta.env.VITE_SERVER+'/api/auth/google', {
          code,
          role
        }).then((result)=>{
          const {token,mode}=result.data;
          console.log(result.data);
          localStorage.setItem("token",token);
          if(mode==="signup"){
            navigate(`/${role}/signup`);
          }
          else{
            if(role==="manager"){
              navigate("/laundry/profile");
            }
            else{
              navigate("/customer/profile");
            }
          }
          setisLoading(false);
          setError("");
        }).catch((err)=>{
          console.log(err);
          setisLoading(false);
          setError("Google Login Failed");
        })
      },
      flow: 'auth-code',
    }
    );
  
    return {googleLogin,errorGoogle,isLoadingGoogle,role,setRole};
}