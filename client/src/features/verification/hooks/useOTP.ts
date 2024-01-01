import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useOTP=(validityPeriodInSeconds:number)=>{
    const navigate=useNavigate();
    const [otp,setOTP]=useState("");
    const [isDisabled,setIsDisabled]=useState(true);
    const [isLocked,setisLocked]=useState(false);
    const [remainingTime, setRemainingTime] = useState<number>(validityPeriodInSeconds);
    const [error,setError]=useState(true);
  
    const onTimerExpired = () => {
      setIsDisabled(false);
      setisLocked(true);
    };
  
    const onResend = () =>{
      setRemainingTime(180);
      setIsDisabled(true);
      setisLocked(false);
    }

    const fetchOTP=async()=>{
        await axios.get(import.meta.env.VITE_SERVER+"/api/verify",{
            headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }).then((res)=>{
            setOTP(res.data.otp);
        }).catch((err)=>{
            console.log(err);
        });
        }

    useEffect(()=>{
        fetchOTP();
    },[])
  
    useEffect(() => {
        const timer = setInterval(() => {
          setRemainingTime((prevTime) => {
            if (prevTime === 0) {
              clearInterval(timer);
              onTimerExpired();
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000);
    
        return () => clearInterval(timer);
      }, [validityPeriodInSeconds, onTimerExpired]);
  
  
    const handleSubmit = async() =>{
      await axios.post(import.meta.env.VITE_SERVER+"/api/verify/otp",{
        otp
      },{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem("token")}`
        }
      }).then((res)=>{
        localStorage.setItem("token",res.data.token);
        navigate(`/${res.data.role}/profile`);
      }).catch((err)=>{
        console.log(err);
        setError(err.response.data.error);
      });
    }
  

    return {otp,setOTP,isDisabled,isLocked,remainingTime,error,handleSubmit,onResend}
}