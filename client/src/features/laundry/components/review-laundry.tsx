import { useState } from "react";
import "react-quill/dist/quill.snow.css";
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
  const {reviews,loading,customerReview,reviewed,averageRating}=useReviewsView();

  if(!loading){
    return (
      <div className="review-container">
          <AverageReview image={laundryImage} disabled={disabled} review_stars={averageRating} setRevealReviewForm={setRevealReviewForm} laundryName={laundryName}/>
          <CustomerReviewCard _id={customerReview?._id} reviewed={reviewed} setRevealReviewForm={setRevealReviewForm} image={customerReview?.profilePicture?customerReview.profilePicture:"brokenProfilePicture.jpg"} username={customerReview?.username} review_stars={customerReview?.rev_stars} review={customerReview?.review}/>
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
