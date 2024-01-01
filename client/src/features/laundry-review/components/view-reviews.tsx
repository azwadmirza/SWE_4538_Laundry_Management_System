import Loader from "../../../partials/loader";
import ReviewCard from "./review-card";
import { useReviewsView } from "../hooks/useReviewsView";

interface IReview{
  reviews:{
    customerProfilePicture: string;
    customerName: string;
    review: string;
    rev_stars: number;
  }[]| undefined;
}

const ViewReviews = ({reviews}:IReview) => {

  return (
    <div className="table view-all-review-table">
      {reviews && reviews.map((review, index) => (
        <ReviewCard image={import.meta.env.VITE_SERVER+'/uploads/'+review.customerProfilePicture} username={review.customerName} review={review.review} review_stars={review.rev_stars}></ReviewCard>
      ))}
    </div>
  );
};

export default ViewReviews;
