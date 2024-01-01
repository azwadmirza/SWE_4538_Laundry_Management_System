import { Modal } from "react-bootstrap";
import ModalProps from "../../../assets/ts/modal";
import { IonIcon } from "@ionic/react";
import { cashOutline} from "ionicons/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useAddBilling } from "../hooks/useAddBilling";

interface IBillingModalProps extends ModalProps{
  orderID:string;
}

const GoToBillingModal = ({show,setShow,orderID}:IBillingModalProps) => {
  const {paymentOption,setPaymentOption,handleSubmit}=useAddBilling(orderID,setShow);
  return ( 
  <Modal show={show} onHide={()=>setShow(false)}>
    <Modal.Header className="modal-header-order" closeButton>Payment</Modal.Header>
    <form onSubmit={handleSubmit}>
    <Modal.Body>
      <div className="w-100 d-flex">
        <div className="title w-25">Payment Method: </div>
        <div className="w-75 d-flex">
        <div className="w-50">
        <button type="button" className={`custom-button full-width ${paymentOption==='cash'?'selected-button':''}`} onClick={()=>setPaymentOption('cash')}><IonIcon icon={cashOutline} className="icon-margin"></IonIcon>Cash</button>
        </div>
        <div className="w-50">
        <button type="button" className={`custom-button full-width ${paymentOption==='digital'?'selected-button':''}`} onClick={()=>setPaymentOption('digital')}><FontAwesomeIcon icon={faCreditCard} className="icon-margin"></FontAwesomeIcon>Digital</button>
        </div>
        </div>
      </div>
    </Modal.Body>
    <Modal.Footer className="w-100"><button className="custom-button full-width" type="submit">Confirm Payment</button></Modal.Footer>
    </form>
  </Modal> 
  );
}
 
export default GoToBillingModal;