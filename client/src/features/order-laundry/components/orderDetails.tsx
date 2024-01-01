import { Badge, Modal, ProgressBar } from "react-bootstrap";
import { orders } from "../../../assets/ts/order";
import ModalProps from "../../../assets/ts/modal";
import { useOrderDetails } from "../hooks/useOrderDetails";
import '../assets/css/order-details.css';
import OrderDetailsCard from "./orderDetailsCard";
import axios from "axios";


interface OrderModalProps extends ModalProps{
  order:orders;
  price:number;
}

const OrderDetails = ({show,setShow,order,price}:OrderModalProps) => {
  const {progress,status,statusColor}=useOrderDetails(order.status);
  const handleApprove=async()=>{
    await axios.patch(import.meta.env.VITE_SERVER+`/api/update-status`,{orderID:order._id,status:"Approved"},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    order.status="Approved";
    setShow(false);
  }

  const handleOrderCancel=async()=>{
    await axios.patch(import.meta.env.VITE_SERVER+`/api/update-status`,{orderID:order._id,status:"Cancelled"},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    order.status="Cancelled";
    setShow(false);
  }

  const handleOrderReady=async()=>{
    await axios.patch(import.meta.env.VITE_SERVER+`/api/update-status`,{orderID:order._id,status:"Ready"},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    order.status="Ready";
    setShow(false);
  }

  const handlePaymentComplete=async()=>{
    await axios.patch(import.meta.env.VITE_SERVER+`/api/update-status`,{orderID:order._id,status:"Completed"},{
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${localStorage.getItem('token')}`
      }
    });
    order.status="Completed";
    setShow(false);
  }

  return ( 
  <Modal show={show} onHide={()=>setShow(false)}>
    <Modal.Header className="modal-header-order" closeButton>Order Details</Modal.Header>
    <Modal.Body className="order-modal w-100">
      <div className="current-status">
        <ProgressBar now={progress} label={`${progress}%`} variant={statusColor}/>
        <small className="text-muted">
            Status: <Badge bg={statusColor}>{status}</Badge>
          </small>
      </div>
      {/* {order.status!=="Pending" && order.status!=="Approved" && (<BillingDetails fullname={order.customerName} email={order.customerInformation?.email} phone={order.customerInformation?.phone} address={order.customerInformation?.address}></BillingDetails>)} */}
      <OrderDetailsCard laundryName={order.laundryName} clothes={order.items} price={price}/>
    </Modal.Body>
    <Modal.Footer className="w-100 justify-content-center mx-auto">
    <div className="price">Total: {!price?"Not Assigned":"৳"+price.toString()}</div>
    <div className="d-flex w-100">
    {order.status==="Pending" && (
      <div className="w-50">
      <button className="custom-button full-width" type="button" onClick={handleApprove}>Approve  <span className="span-text-order">Order</span></button>
      </div>
    )}
    {order.status==="Approved" && (
      <div className="w-50">
      <button className="custom-button full-width" type="button" onClick={handleOrderReady}><span className="span-text-order">Order</span> Prepared</button>
      </div>
    )}
    {order.status==="Paid" && (
      <div className="w-100">
      <button className="custom-button full-width" type="button" onClick={handlePaymentComplete}><span className="span-text-order">Payment</span> Complete</button>
      </div>
    )}
    {order.status!=="Cancelled" && order.status!=="Paid" && order.status!=="Complete" && order.status!=="Ready" && order.status!=="Paying" && (
      <div className={`${order.status!=="Pending" && order.status!=="Approved"?'w-100':'w-50'}`}>
      <button className="custom-button full-width" type="button" onClick={handleOrderCancel}>Cancel  <span className="span-text-order">Order</span></button>
      </div>
    )}
    </div>
    </Modal.Footer>
  </Modal> );
}
 
export default OrderDetails;