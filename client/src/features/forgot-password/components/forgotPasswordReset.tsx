import {
  Form,
  Button,
  InputGroup
} from "react-bootstrap";
import { useState } from "react";
import {
  Lock,
  EyeFill,
  EyeSlashFill
} from "react-bootstrap-icons";
import { IonIcon } from "@ionic/react";
import { lockClosedOutline } from "ionicons/icons";


type PasswordResetProps={
  email:string
};

const PasswordReset = ({email}:PasswordResetProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorConfirmPassword, setErrorCPassword] = useState("");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =useState(false);
  const [isDisabled, setIsDisabled] =useState(false);
  const passwordChange = (e:string) =>{

  }

  const confirmPasswordChange = (e:string) =>{

  }



  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    console.log('comes here');
    await e.preventDefault();
  }

  return ( 
        <Form onSubmit={(e)=>handleSubmit(e)}> 
        <div className="inputbox">
                        <IonIcon icon={lockClosedOutline}></IonIcon>
                        <input type="password" id="password" name="password" required/>
                        <label htmlFor="">Password</label>
                    </div>
                    <div id="errorPassword" className="errorBox"></div>
                    <div className="inputbox">
                        <IonIcon icon={lockClosedOutline}></IonIcon>
                        <input type="password" id="confirmPassword" name="confirmPassword" required/>
                        <label htmlFor="">Re-enter password</label>
                    </div>

                  <div className='d-flex justify-content-center'>
        <button type="submit" disabled={isDisabled}>
          Reset Password
        </button>
        </div>
      </Form>  
   );
}
 
export default PasswordReset;