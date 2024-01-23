import {useState,useEffect} from 'react';
import axios from 'axios';

export const useLaundry=()=>{
  const [Laundry, setLaundries] = useState<any>([]);
  const [searchTerm,setSearchTerm]=useState<string>();
  const [filteredLaundry,setFilteredLaundry]=useState<any[] | undefined>();
  const [isLoading,setIsLoading]=useState(false);

  const retrieveLaundries=async()=>{
    setIsLoading(true);
    await axios.get(import.meta.env.VITE_SERVER+"/api/manager/get-all-laundries",{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem("token")}`
      }
    }).then((res)=>{
      setLaundries(res.data.laundries);
      setFilteredLaundry(res.data.laundries);
    }).catch((err)=>{
      console.log(err);
    });
    setIsLoading(false);
  }

  useEffect(()=>{
    retrieveLaundries();
  },[])


  const handleSearchTerm=(input:string)=>{
    setSearchTerm(input);
    if(input==="" ||input===undefined){
      setFilteredLaundry(Laundry);
    }
    if(Laundry!==undefined && input!==undefined){
      setFilteredLaundry(Laundry.filter((value:any)=>value.username.toLowerCase().includes(input.toLowerCase())));
    }
  }


  return {filteredLaundry,searchTerm,handleSearchTerm,isLoading};
}

export default useLaundry;