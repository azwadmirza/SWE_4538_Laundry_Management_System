import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import {Envelope} from "react-bootstrap-icons";
import { useState } from "react";

import ForgotPasswordEmailVerify from './forgotPasswordEmailVerify';
import { IonIcon } from '@ionic/react';
import { mailOutline } from 'ionicons/icons';

const ForgotPasswordSendEmail = () => {
  const [emailSent,isEmailSent]=useState(false);
  const [email,setEmail]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [isDisabled,setIsDisabled]=useState(false);
    const changeEmail = (e:string) =>{
      setEmail(e);
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
      isEmailSent(true);
    }
    if(!emailSent){
      return ( 
        <Form onSubmit={(e)=>handleSubmit(e)}> 
            <Form.Group>
                      <div className="errorMessage" style={{color:"red"}}>
                      </div>
                    </Form.Group>
    
                    <div className="inputbox">
                        <IonIcon icon={mailOutline}></IonIcon>
                        <input type="email" id="email" name="email"  required/>
                        <label htmlFor="">Email</label>
                    </div>
    
                      <div className='d-flex justify-content-center'>
            <button type="submit" disabled={isDisabled}>
              Send Recovery Email
            </button>
            </div>
          </Form>
       );
    }
    else{
      return <ForgotPasswordEmailVerify email={email}/>
    }
}
 
export default ForgotPasswordSendEmail;