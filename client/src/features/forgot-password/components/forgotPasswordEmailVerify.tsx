import Button from 'react-bootstrap/Button';
import OtpInput from 'react18-input-otp';
import { useState } from "react";
import 'bootstrap';
import OTPValidityTimer from '../../../partials/OTPTimer';
import PasswordReset from './forgotPasswordReset';

type ForgotPasswordProps={
  email:string
};

const ForgotPasswordEmailVerify = ({email}:ForgotPasswordProps) => {
    const [otp,setOTP]=useState("");
    const [isDisabled,setIsDisabled]=useState(true);
    const [isLocked,setisLocked]=useState(false);
    const [error,setError]=useState(false);
    const [enterotp,setEnterotp]=useState(true);
    const handleTimerExpire = () =>{
      setisLocked(true);
    }

    const resend = () =>{
      window.location.reload();
    }

    const handleSubmit = async() =>{
      setEnterotp(false);
    }
    
  if(enterotp){
    return (
      <div className="verifyDiv">
    <p className="p2">
      An OTP has been sent to your entered email {email}
    </p>
    <p className="p2" style={{color:'red'}}>{error}</p>
    <div className="otpElements">
      <p className="p3">Enter your Code here</p>
      <div className="otp">
        <OtpInput
          onChange={setOTP}
          value={otp}
          inputStyle="inputStyle"
          numInputs={6}
          separator={<span></span>}
        />
      </div>
      <p>OTP is valid for: <OTPValidityTimer validityPeriodInSeconds={180} onTimerExpired={handleTimerExpire}/></p>
      
    </div>
    <div style={{marginBottom:'2%'}}><p className="p3">Didn't receive the code?</p></div>
    <div className="d-flex">
    <button disabled={isDisabled} onClick={resend}>Resend</button>
    <button disabled={isLocked} style={{marginLeft:'2%'}} onClick={()=>handleSubmit()}>
        Verify
      </button>
    </div>

  </div>
 );
  }
  else{
    return (
      <PasswordReset email={email}></PasswordReset>
    )
  }
}
 
export default ForgotPasswordEmailVerify;