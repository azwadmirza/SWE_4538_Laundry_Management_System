import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import {useEffect, useState} from 'react';
import {orders} from '../../../assets/ts/order';
import { useOrderCard } from '../hooks/useOrderCard';
import { IonIcon } from '@ionic/react';
import { calendarNumberOutline } from 'ionicons/icons';
import OrderDetails from './orderDetails';

interface OrderCardProps{
  order:orders;
}

const OrderCard = ({ order }:OrderCardProps) => {
  const {status,statusColor}=useOrderCard(order.status);
  const [showDetails,setShowDetails]=useState<boolean>(false);
  const [price,setPrice]=useState<number>(0);
  useEffect(()=>{
    let total:number=0;
    order.items.forEach(item=>{
      total+=item.unitPrice*item.quantity;
    })
    setPrice(total);
  },[order])
  return (
    
        <Card className='order-card mb-3'>
          <Card.Header className='order-card-header'>
            Order ID: {order._id}
          </Card.Header>
          <OrderDetails show={showDetails} setShow={setShowDetails} order={order} price={price}/>
          <Card.Body>
            <Card.Text>
              <div className='d-flex justify-content-between'>
                <div>
                  <p>
                    <IonIcon icon={calendarNumberOutline}></IonIcon> {new Date(order.updatedAt).toLocaleDateString()+" "+new Date(order.updatedAt).toLocaleTimeString()}
                  </p>
                </div>
                <div>
                  <p>Total Price: ৳{price.toString()} </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <div className="w-100">
            <small className="text-muted">
              Status: <Badge bg={statusColor}>{status}</Badge>
            </small>
            </div>
            <div className="custom-button-width d-flex float-end">
            <button className="custom-button full-width mx-2" onClick={()=>setShowDetails(true)}>
              View details
            </button>
            </div>
          </Card.Footer>
        </Card>
      
  );
};

export default OrderCard;