import { Badge, Modal, ProgressBar } from "react-bootstrap";
import { orders } from "../../../assets/ts/order";
import ModalProps from "../../../assets/ts/modal";
import { useOrderDetails } from "../hooks/useOrderDetails";
import '../assets/css/order-details.css';
import OrderDetailsCard from "./orderDetailsCard";
import { useState } from "react";
import axios from "axios";
import GoToBillingModal from "./goToBilling";


interface OrderModalProps extends ModalProps{
  order:orders;
  price:number;
}

const OrderDetails = ({show,setShow,order,price}:OrderModalProps) => {
  const {progress,statusColor}=useOrderDetails(order.status);
  const [showBilling,setShowBilling]=useState<boolean>(false);
  const handleReadyConfirmation=async()=>{
    await axios.patch(import.meta.env.VITE_SERVER+`/api/update-status`,{orderID:order._id,status:"Paying"},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    order.status="Paying";
  }

  return ( 
  <>
  <GoToBillingModal show={showBilling} setShow={setShowBilling} orderID={order._id}></GoToBillingModal>
  <Modal show={show} onHide={()=>setShow(false)}>
    <Modal.Header className="modal-header-order" closeButton>Order Details</Modal.Header>
    <Modal.Body className="order-modal w-100">
      <div className="current-status">
        <ProgressBar now={progress} label={`${progress}%`} variant={statusColor}/>
        <small className="text-muted">
            Status: <Badge bg={statusColor}>{order.status}</Badge>
          </small>
      </div>
      {/* {order.status!=="Pending" && order.status!=="Approved" && (<BillingDetails fullname={order.customerName} email={order.customerInformation?.email} phone={order.customerInformation?.phone} address={order.customerInformation?.address}></BillingDetails>)} */}
      <OrderDetailsCard laundryName={order.laundryName} clothes={order.items} price={price}/>
    </Modal.Body>
    <Modal.Footer className="w-75 justify-content-center mx-auto">
    <div className="price">Total: {!price?"Not Assigned":"৳"+price.toString()}</div>
    {order.status==="Ready" && (
      <button className="custom-button full-width" onClick={handleReadyConfirmation}>Confirm Order Received</button>
    )}
    {order.status==="Paying" && (
      <button className="custom-button full-width" onClick={()=>{
        setShowBilling(true);
        setShow(false);
      }}>Make Payment</button>
    )}
    {(order.status==="Pending") && (
      <button className="custom-button full-width">Cancel Order</button>
    )}
    </Modal.Footer>
  </Modal> 
  </>);
}
 
export default OrderDetails;