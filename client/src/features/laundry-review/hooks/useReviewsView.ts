import axios from 'axios';
import {useEffect, useState} from 'react';
export const useReviewsView=()=>{
  const [reviews, setReviews] = useState<
    | {
        customerProfilePicture: string;
        customerName: string;
        review: string;
        rev_stars: number;
      }[]
    | undefined
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalReviews,setTotalReviews]=useState<number>(0);
  const [managerName,setManagerName]=useState<string>('');
  const [managerProfilePicture,setManagerProfilePicture]=useState<string>('');

  useEffect(() => {
    const fetchReviews=async()=>{
      await axios.get(import.meta.env.VITE_SERVER+'/api/reviews/manager',{
        headers:{
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      }).then((res)=>{
        setReviews(res.data.reviews);
        setTotalReviews(res.data.average_review);
        setManagerName(res.data.managerName);
        setManagerProfilePicture(res.data.managerProfilePicture);
      }).catch((err)=>{
        console.log(err);
      });
      setLoading(false);
    }
    fetchReviews();
  }, []);

  return {managerName,managerProfilePicture,loading,reviews,totalReviews};
}