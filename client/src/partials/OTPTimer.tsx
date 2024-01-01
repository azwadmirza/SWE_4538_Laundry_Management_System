import '../assets/css/otp.css';

interface IOtp{
  remainingTime:number;
}

const OTPValidityTimer = ({ remainingTime }:IOtp) => {

  const formatTime = (timeInSeconds:number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div style={{color:'red'}}>{formatTime(remainingTime)}</div>;
};

export default OTPValidityTimer;
