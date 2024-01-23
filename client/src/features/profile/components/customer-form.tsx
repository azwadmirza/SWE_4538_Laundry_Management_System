import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../../partials/loader";
import { callOutline, mailUnreadOutline, personCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import ConfirmPasswordModal from "./confirm-password-modal";

interface ICustomerForm{
  email:string;
  username:string;
  setUsername:React.Dispatch<React.SetStateAction<string>>;
  password:string;
  setPassword:React.Dispatch<React.SetStateAction<string>>;
  phone:string;
  setPhoneNumber:React.Dispatch<React.SetStateAction<string>>;
  isLoading:boolean;
  isDisabled:boolean;
  turnOnEdit:React.Dispatch<React.SetStateAction<boolean>>;
  error:string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const ProfileFormCustomer = ({handleSubmit,email,turnOnEdit,username,setUsername,password,setPassword,phone,setPhoneNumber,isLoading,isDisabled,error}:ICustomerForm) => {
  const [passwordVisibility,setPasswordVisibility]=useState("password");
  const [show,setShow]=useState(false);


  if(!isLoading){ 
    return (
      <div>
        <div className="profileInfo d-flex justify-content-between">
          <h4 className="InfoHeader mb-4">Personal Information</h4>
          <button
            className="btn btn-outline-dark btn-editProfile "
            onClick={()=>turnOnEdit(!isDisabled)}
          >
            Edit <span className="mobile-view"> Profile</span>
            <i className="bx bx-cog bx-sm"></i>
          </button>
        </div>
        <Form onSubmit={(e)=>handleSubmit(e)}>
        <div className="error" style={{color:"red"}}>{error}</div>

          <div className="inputbox">
            <IonIcon icon={personCircleOutline}></IonIcon>
            <input
              type="text"
              disabled={isDisabled}
              value={username}
              id="username"
              onChange={(e)=>setUsername(e.target.value)}
              />
              {username==="" || isDisabled || (<label htmlFor="username">Name</label>)}
          </div>
          <div className="inputbox">
          <IonIcon icon={callOutline}></IonIcon>
          <input type="text" pattern="[01]{2}[3-9]{1}[0-9]{8}" disabled={isDisabled} value ={phone} id="phone" onChange={(e)=>setPhoneNumber(e.target.value)} />
          {phone==="" || isDisabled || <label htmlFor="phone">Contact No.</label>}
        </div>
        <div className="inputbox">
          <IonIcon icon={mailUnreadOutline}></IonIcon>
          <input type="email" disabled={true} value ={email} id="email" />
        </div>
          {/* {!googleId && isEditing &&(<a href={"changePassword/" + user._id} style={{marginLeft:"75%"}}>Change Password</a>)} */}
        {!isDisabled && (
          <Button className="btn btn-outline-dark btn-save" type="submit" disabled={isLoading}>
            Save
          </Button>
        )}
      </Form>
      <ConfirmPasswordModal show={show} handleClose={()=>setShow(false)} handleSubmit={handleSubmit} error={error} passwordVisibility={{passwordVisibility,setPasswordVisibility}} password={{password:password,setPassword:setPassword}}/>
      </div>
    );
  }
  else{
    return (
      <Loader/>
    );
  }
};
export default ProfileFormCustomer;
