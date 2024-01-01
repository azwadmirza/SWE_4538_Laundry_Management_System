import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import ReviewForm from "./review-form-modal";
import ViewReviews from "./view-reviews";
import CustomerReviewCard from "./customer-review";
import AverageReview from "./average-review-card";
import { useReviewsView } from "../hooks/useReviewsView";
import Loader from "../../../partials/loader";

type ReviewOrderProps={
  _id:string|undefined,
  laundryImage:string|undefined,
  laundryName:string|undefined,
}

const ReviewOrder = ({_id,laundryImage,laundryName}:ReviewOrderProps) => {
  const [revealReviewForm, setRevealReviewForm] = useState(false);
  const [disabled,setDisabled]=useState(false);
  const {reviews,loading,customerReview,reviewed}=useReviewsView();

  if(!loading){
    return (
      <div className="review-container">
          <AverageReview image={import.meta.env.VITE_SERVER+"/uploads/"+laundryImage} disabled={disabled} review_stars={4.5} setRevealReviewForm={setRevealReviewForm} laundryName={laundryName}/>
          <CustomerReviewCard reviewed={reviewed} setRevealReviewForm={setRevealReviewForm} image={customerReview?.profilePicture?import.meta.env.VITE_SERVER+"/uploads/"+customerReview.profilePicture:"brokenProfilePicture.jpg"} username={customerReview?.username} review_stars={customerReview?.review_stars} review={customerReview?.review}/>
          <ReviewForm reviewed={reviewed} revealForm={revealReviewForm} setRevealReviewForm={setRevealReviewForm}/>
          <ViewReviews reviews={reviews}/>
      </div>
    );
  }
  else{
    return (<Loader/>)
  }
};

export default ReviewOrder;
