import { useEffect, useState } from "react"
import { usePagination } from "../../../hooks/usePagination";
import { orders } from "../../../assets/ts/order";
import axios from "axios";

export const useOrder=()=>{
  const [orders,setOrders]=useState<orders[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    const fetchOrders=async()=>{
      await axios.get(import.meta.env.VITE_SERVER+"/api/get-orders/customer",{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      }).then((res)=>{
        setOrders(res.data);
      }).catch((err)=>{
        console.log(err);
      });
      setLoading(false);
    }
    fetchOrders();
  },[]);

  const {displayedarrayComponents,currentPage,totalPages,handleFirstPageClick,handleLastPageClick,handleNextPageClick,handlePageChange,handlePrevPageClick}=usePagination(orders,8);
  

  return {loading,displayedarrayComponents,totalPages,currentPage,handleFirstPageClick,handleLastPageClick,handleNextPageClick,handlePageChange,handlePrevPageClick}
  
}