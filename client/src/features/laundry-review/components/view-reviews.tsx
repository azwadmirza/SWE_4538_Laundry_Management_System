import ReviewCard from "./review-card";

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
      {reviews && reviews.map((review) => (
        <ReviewCard image={review.customerProfilePicture} username={review.customerName} review={review.review} review_stars={review.rev_stars}></ReviewCard>
      ))}
    </div>
  );
};

export default ViewReviews;
