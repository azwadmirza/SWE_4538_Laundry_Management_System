import { IonIcon } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface BillingDetailsProps{
  fullname: string|undefined;
  phone: string|undefined;
}

const BillingDetails = ({fullname,phone}:BillingDetailsProps) => {
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
              <td> <span className="title"><FontAwesomeIcon icon={faPhone} className="billing-icon"></FontAwesomeIcon>Phone</span></td>
              <td>{phone}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   );
}
 
export default BillingDetails;