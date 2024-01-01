import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { IItems } from "../components/add-new-order";

export const useLaundryDetails=()=>{
    const {id}=useParams();
    const [items,setItems]=useState<IItems[]>([]);
    const [isLoading,setIsLoading]=useState(false);
    const  [laundryName,setLaundryName]=useState("");
    const [laundryImage,setLaundryImage]=useState("");

    const retriveLaundryInformation=async()=>{
        setIsLoading(true);
        await axios.get(import.meta.env.VITE_SERVER+"/api/manager/get-laundry-details/"+id
        ,{
            headers:{
              "Authorization":`Bearer ${localStorage.getItem("token")}`
            }
          }).then((res)=>{
            setLaundryImage(res.data.profilePicture);
            setLaundryName(res.data.username)
            setItems(res.data.pricingDetails);
          }
            ).catch((err)=>{
                console.log(err);
            });
        setIsLoading(false);
    }

    useEffect(()=>{
        retriveLaundryInformation();
    },[])

    return {id,laundryName,laundryImage,items,isLoading}
}