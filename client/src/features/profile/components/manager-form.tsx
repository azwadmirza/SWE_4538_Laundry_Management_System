import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Loader from "../../../partials/loader";
import { callOutline,homeOutline, mailUnreadOutline,mapOutline,timerOutline,timeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import ConfirmPasswordModal from "./confirm-password-modal";
interface IManagerForm{
  openingTime:string;
  setOpeningTime:React.Dispatch<React.SetStateAction<string>>;
  closingTime:string;
  setClosingTime:React.Dispatch<React.SetStateAction<string>>;
  address:string;
  setAddress:React.Dispatch<React.SetStateAction<string>>;
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

const ProfileFormLaundry= ({handleSubmit,openingTime,setOpeningTime,address,setAddress, closingTime, setClosingTime,email,turnOnEdit,username,setUsername,password,setPassword,phone,setPhoneNumber,isLoading,isDisabled,error}:IManagerForm)=> {
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
          Edit<span className="mobile-view">Profile</span>
          <i className="bx bx-cog bx-sm"></i>
        </button>
      </div>
      <Form onSubmit={(e)=>handleSubmit(e)}>
      <div className="error" style={{color:"red"}}>{error}</div>
      <div className="inputbox">
          <IonIcon icon={homeOutline}></IonIcon>
          <input
            type="text"
            disabled={isDisabled}
            value={username}
            id="laundry"
            onChange={(e)=>setUsername(e.target.value)}
            />
            {username==="" || isDisabled || (<label htmlFor="laundry">Laundry Name</label>)}
        </div>
        <div className="inputbox">
        <IonIcon icon={callOutline}></IonIcon>
        <input type="text" pattern="[01]{2}[3-9]{1}[0-9]{8}" disabled={isDisabled} value ={phone} id="phone" onChange={(e)=>setPhoneNumber(e.target.value)} />
        {phone==="" || isDisabled || (<label htmlFor="phone">Contact No.</label>)}
      </div>
      <div className="inputbox">
                <IonIcon icon={timeOutline}></IonIcon>
                <input
                  type="time"
                  name="openingTime"
                  id="openingTime"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
                {openingTime==="" || isDisabled || (<label htmlFor="openingTime">Opening Time</label>)}
              </div>
              <div className="inputbox">
                <IonIcon icon={timerOutline}></IonIcon>
                <input
                  type="time"
                  name="closingTime"
                  id="closingTime"
                  value={closingTime}
                  onChange={(e) => setClosingTime(e.target.value)}
                  min={openingTime}
                />
                {closingTime==="" || isDisabled || (<label htmlFor="closingTime">Closing Time</label>)}
              </div>
              <div className="inputbox">
                <IonIcon icon={mapOutline}></IonIcon>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                {address==="" || isDisabled || (<label htmlFor="">Address</label>)}
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
    return(
      <Loader/>
    )
  }
}

export default ProfileFormLaundry;