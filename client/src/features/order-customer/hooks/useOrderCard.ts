import { useEffect, useState } from "react";
import { handleStatusColor } from "../../../utils/HandleStatusColorCustomer";

export const useOrderCard=(orderStatus:string)=>{
  const [status,setStatus] = useState(orderStatus);
  const [statusColor, setStatusColor] = useState('warning');
  

  useEffect(() => {
    handleStatusColor(orderStatus,setStatusColor,setStatus);
  }, [orderStatus]);
  return {status,statusColor};
}