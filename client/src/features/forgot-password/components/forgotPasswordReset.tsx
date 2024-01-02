import {
  Form
} from "react-bootstrap";

import { IonIcon } from "@ionic/react";
import {
  lockClosedOutline,
  lockOpenOutline,
} from "ionicons/icons";
import { useResetPassword } from "../hooks/useResetPassword";
import DOMPurify from "dompurify";


type PasswordResetProps={
  email:string,
  role:string
};

const PasswordReset = ({email,role}:PasswordResetProps) => {
  const  {password,passwordChange,confirmPassword,confirmPasswordChange,passwordVisibility,confirmPasswordVisibility,setConfirmPasswordVisibility,setPasswordVisibility,handleSubmit,isDisabled,errorPassword,errorMessage,errorConfirmPassword}=useResetPassword(email,role);

  return ( 
        <Form onSubmit={(e)=>handleSubmit(e)}> 
        <div className="errorBox" style={{color:"red"}}>
          <p>{errorMessage}</p>
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
              <input
                type={passwordVisibility}
                onChange={(e) =>
                  passwordChange(DOMPurify.sanitize(e.target.value))
                }
                id="password"
                name="password"
                required
                value={password}
              />
              <label htmlFor="">Password</label>
            </div>
            <div id="errorPassword" className="errorBox">
              {errorPassword}
            </div>
            <div className="inputbox">
              {(confirmPasswordVisibility === "password" && (
                <IonIcon
                  icon={lockClosedOutline}
                  onClick={() => setConfirmPasswordVisibility("text")}
                ></IonIcon>
              )) ||
                (confirmPasswordVisibility === "text" && (
                  <IonIcon
                    icon={lockOpenOutline}
                    onClick={() => setConfirmPasswordVisibility("password")}
                  ></IonIcon>
                ))}
              <input
                type={confirmPasswordVisibility}
                onChange={(e) =>
                  confirmPasswordChange(DOMPurify.sanitize(e.target.value))
                }
                required
                value={confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
              />
              <label htmlFor="">Re-enter password</label>
            </div>
            <div id="errorConfirmPassword" className="errorBox">
              {errorConfirmPassword}
            </div>

                  <div className='w-100 justify-content-center'>
        <button type="submit" className="custom-button full-width" disabled={isDisabled}>
          Reset Password
        </button>
        </div>
      </Form>  
   );
}
 
export default PasswordReset;