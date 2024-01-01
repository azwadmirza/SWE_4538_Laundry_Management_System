import { IonIcon } from "@ionic/react";
import { mailUnreadOutline, personCircleOutline } from "ionicons/icons";
import { faMapMarkedAlt, faMarker, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DeliveryDetails{
  username: string|undefined;
  email: string|undefined;
  phone: string|undefined;
  imageURL: string|undefined;
}

const DeliveryDetails = ({username,email,phone,imageURL}:DeliveryDetails) => {
  return ( 
    <div className="w-100">
      <div className="order-details-title">
        Delivery Man Details
      </div>
      <div className="w-100 d-flex">
        <div className="w-75">
        <table className="w-100 order-details-table">
          <tbody>
            <tr>
              <td><span className="title"><IonIcon icon={personCircleOutline} className="billing-icon"></IonIcon>Full Name</span></td>
              <td>{username}</td>
            </tr>
            <tr>
              <td> <span className="title"><IonIcon icon={mailUnreadOutline} className="billing-icon"></IonIcon>Email</span></td>
              <td>{email}</td>
            </tr>
            <tr>
              <td> <span className="title"><FontAwesomeIcon icon={faPhone} className="billing-icon"></FontAwesomeIcon>Phone</span></td>
              <td>{phone}</td>
            </tr>
          </tbody>
        </table>
        </div>
        <div className="w-25">
          <img src={imageURL} className="delivery-profile-picture"/>
        </div>
      </div>
    </div>
   );
}
 
export default DeliveryDetails;