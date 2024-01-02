import { Card } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline, logoGoogle, lockOpenOutline } from "ionicons/icons";
import { useLogin } from "../hooks/useLogin";
import '../assets/css/login.css';
import { useState } from "react";
import Loader from "../partials/loader";
import GoogleContinueModal from "./google-continue";

interface LoginProps{
  changeState:React.Dispatch<React.SetStateAction<string>>
}

const Login = ({changeState}:LoginProps) => {

  const {userType,setUserType,error,email,setEmail,password,changePassword,login}=useLogin();
  const [passwordVisibility,setPasswordVisibility]=useState("password");
  const [loading,setLoading]=useState(false);
  const [show,setShow]=useState(false);

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    await login();
    setLoading(false);
  }

  if(loading){
    return(
      <Loader/>
    )
  }
  else{
    return (
      <Card className="login">
        <GoogleContinueModal show={show} setShow={setShow}/>
        <Card.Body>
          <h4>Login</h4>
          <form className="form-value" method="POST" onSubmit={(e)=>handleSubmit(e)}>
            <div id="confirmErrorPassword" className="errorBox">
              {error}
            </div>
            <div className="radio-button-group">
            <button
              className={`radio-button ${
                userType === "manager" ? "radio-button" : "radio-button-outline"
              }`}
              onClick={() => setUserType("manager")}
            >
              Manager
            </button>
            <button
              className={`radio-button ${
                userType === "customer"
                  ? "radio-button"
                  : "radio-button-outline"
              }`}
              onClick={() => setUserType("customer")}
            >
              Customer
            </button>
          </div>
            <div className="inputbox">
              <IonIcon icon={mailOutline} />
              <input type="email" required id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              <label htmlFor="email">Email</label>
            </div>
            <div className="inputbox">
              {(passwordVisibility === "password" && (
              <IonIcon
                icon={lockClosedOutline}
                onClick={() => setPasswordVisibility("text")}
              ></IonIcon>
            )) ||
              (passwordVisibility === "text" && (
                <IonIcon
                  icon={lockOpenOutline}
                  onClick={() => setPasswordVisibility("password")}
                ></IonIcon>
              ))}
              <input type={passwordVisibility} id="password" name="password" required value={password} onChange={(e)=>changePassword(e.target.value)} />
              <label htmlFor="password">Password</label>
            </div>
            <button type="submit" name="submit" id="submit" className="custom-button">
              LOGIN
            </button>
            <hr/>
            <button className="custom-button full-width" onClick={()=>setShow(true)}>
              <IonIcon icon={logoGoogle} />
              <span>Continue with Google</span>
            </button>
            <div className="register-link">
              <p>
                Don't have an account? <a onClick={()=>changeState("SignUp")}  className="link-to-register">Register</a>
              </p>
            </div>
            <div className="register-link">
              <p>
                Forgot Password? <a href="/forgot"  className="link-to-register">Reset Password</a>
              </p>
            </div>
          </form>
        </Card.Body>
      </Card>
  );
  }
};

export default Login;
