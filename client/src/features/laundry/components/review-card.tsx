import { Card } from "react-bootstrap";
import StarsRating from "react-star-rate";
import ReviewCardProps from "../assets/ts/review-card";

const ReviewCard = ({image,username,review_stars,review}:ReviewCardProps) => {
  return (
    <Card className="card-review">
      <Card.Header className="card-header-review"><img
          src={image}
          width="40px"
          height="40px"
          alt="profile picture"
          className="review-image"
        ></img>{username}</Card.Header>
      <Card.Body>
        <div className="container col-lg-12">
          <StarsRating
            classNamePrefix="avg-rating-stars col"
            value={review_stars}
            disabled={true}
          />
          <p className="avg-rating col">{review_stars} / 5</p>
        </div>
        <div className="review">
          <span className="review-comment">{review}</span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
