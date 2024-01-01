import { IonIcon } from "@ionic/react";
import { mailUnreadOutline, personCircleOutline } from "ionicons/icons";
import { faMapMarkedAlt, faMarker, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BillingDetailsProps{
  fullname: string|undefined;
  email: string|undefined;
  phone: string|undefined;
  address: string|undefined;
}

const BillingDetails = ({fullname,email,phone,address}:BillingDetailsProps) => {
  return ( 
    <div className="w-100">
      <div className="order-details-title">
        Billing Details
      </div>
      <div className="w-100">
        <table className="w-100 order-details-table">
          <tbody>
            <tr>
              <td><span className="title"><IonIcon icon={personCircleOutline} className="billing-icon"></IonIcon>Full Name</span></td>
              <td>{fullname}</td>
            </tr>
            <tr>
              <td> <span className="title"><IonIcon icon={mailUnreadOutline} className="billing-icon"></IonIcon>Email</span></td>
              <td>{email}</td>
            </tr>
            <tr>
              <td> <span className="title"><FontAwesomeIcon icon={faPhone} className="billing-icon"></FontAwesomeIcon>Phone</span></td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td><span className="title"><FontAwesomeIcon icon={faMapMarkedAlt} className="billing-icon"></FontAwesomeIcon> Address</span></td>
              <td>{address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   );
}
 
export default BillingDetails;