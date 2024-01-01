import { handleStatusColor } from "../../../utils/HandleStatusColorCustomer";
import {useState,useEffect} from 'react';

export const useOrderDetails=(orderStatus:string)=>{
  const [status,setStatus] = useState(orderStatus);
  const [statusColor, setStatusColor] = useState('warning');
  const [progress,setProgress]=useState(0);

  const handleProgress=()=>{
    switch(orderStatus){
      case 'Pending':
        setProgress(20);
        break;
      case 'Approved':
        setProgress(40);
        break;
      case 'Ready':
        setProgress(60);
        break;
      case 'Paying':
          setProgress(80);
        break;
      case 'Paid':
          setProgress(90);
        break;
      case 'Completed':
        setProgress(100);
        break;
      case 'Cancelled':
        setProgress(0);
        break;
      default:
        setProgress(0);
    }
  }

  useEffect(() => {
    handleStatusColor(orderStatus,setStatusColor,setStatus);
    handleProgress();
  }, [orderStatus]);
  return {progress,status,statusColor};
}