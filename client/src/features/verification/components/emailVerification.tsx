import Card from 'react-bootstrap/Card';
import OtpInput from 'react18-input-otp';
import OTPValidityTimer from '../../../partials/OTPTimer';
import { IonIcon } from '@ionic/react';
import { mailUnreadOutline } from 'ionicons/icons';
import '../assets/css/email-verification.css';
import { useOTP } from '../hooks/useOTP';


const EmailVerification = () => {
  const {otp,setOTP,isDisabled,isLocked,remainingTime,error,handleSubmit,onResend}=useOTP(180);
  return ( 
    <Card>
    <div className="email-verification">
    <Card.Header><h2>Email Verification <IonIcon icon={mailUnreadOutline}></IonIcon></h2></Card.Header>
    <Card.Body>
      <p className="p2">
        An OTP has been sent to your entered email address. Please enter the OTP below to verify your email address.
      </p>
      <p className="errorBox">{error}</p>
      <div className="otpElements">
        <p className="p3">Enter your Code here</p>
        <div className="otp">
          <OtpInput
            onChange={setOTP}
            value={otp}
            numInputs={6}
            className='otpbox'
            separator={<span> </span>}
          />
        </div>
        <p>OTP is valid for: <OTPValidityTimer remainingTime={remainingTime}/></p>
        
      </div>
      <div><p className="p3">Didn't receive the code?</p></div>
      <div className="d-flex mx-auto w-100">
            <div className="w-50">
            <button className='custom-button full-width' disabled={isDisabled} onClick={onResend} >Resend</button>
            </div>
            <div className="w-50">
            <button className='custom-button full-width' disabled={isLocked} style={{marginLeft:'2%'}} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
    </Card.Body>
    </div>
    </Card>
   );
}
 
export default EmailVerification;