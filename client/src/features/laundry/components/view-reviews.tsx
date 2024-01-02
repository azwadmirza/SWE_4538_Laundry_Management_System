import ReviewCard from "./review-card";

interface IReviewProps{
  reviews: | {
    customerProfilePicture: string;
    customerName: string;
    review: string;
    rev_stars: number;
  }[]
| undefined;
}

const ViewReviews = ({reviews}:IReviewProps) => {
  return (
    <div className="table view-all-review-table">
      {reviews && reviews.map((review, index) => (
        <ReviewCard image={review.customerProfilePicture} username={review.customerName} review={review.review} review_stars={review.rev_stars}></ReviewCard>
      ))}
    </div>
  );
};

export default ViewReviews;
