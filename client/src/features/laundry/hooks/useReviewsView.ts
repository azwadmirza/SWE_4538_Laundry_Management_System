import axios from 'axios';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
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
  const {id}=useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewed,setReviewed]=useState<boolean>(false);
  const [customerReview,setCustomerReview]=useState<{
    profilePicture: string;
    username: string|undefined;
    review: string|undefined;
    rev_stars: number|undefined;
  }>();
  const [averageRating,setAverageRating]=useState<number>(0);

  const fetchCustomerReview=async()=>{
    await axios.get(import.meta.env.VITE_SERVER+'/api/review/customer/'+id,{
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    }).then((res)=>{
      setCustomerReview({
        profilePicture:res.data.customerProfilePicture,
        username:res.data.customerName,
        review:res.data.review,
        rev_stars:res.data.rev_stars
      });
      setReviewed(res.data.reviewed);
    }).catch((err)=>{
      console.log(err);
    });
  }

  const fetchReviews=async()=>{
    await axios.get(import.meta.env.VITE_SERVER+'/api/reviews/other-customers/'+id,{
      headers:{
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    }).then((res)=>{
      console.log(res.data);
      setReviews(res.data);
      let total=0;
      res.data.forEach((review:any)=>{
        total+=review.rev_stars;
      })
      setAverageRating(total/res.data.length);

    }).catch((err)=>{
      console.log(err);
    });
  }

  const fetchAllReviews=async()=>{
    await fetchCustomerReview();
    await fetchReviews();
    setLoading(false);
  }

  useEffect(()=>{
    fetchAllReviews();
  },[])

  return {averageRating,reviews,loading,customerReview,reviewed};
}