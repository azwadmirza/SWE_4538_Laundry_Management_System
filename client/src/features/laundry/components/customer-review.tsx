import { IonIcon } from "@ionic/react";
import { createOutline } from "ionicons/icons";
import { Card } from "react-bootstrap";
import StarsRating from "react-star-rate";
import ReviewCardProps from "../assets/ts/review-card";

interface CustomerReviewCardProps extends ReviewCardProps{
  reviewed:boolean;
  setRevealReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerReviewCard = ({reviewed,setRevealReviewForm,image,username,review_stars,review}:CustomerReviewCardProps) => {
  if(reviewed){
    return (
      <Card className="card-review">
        <Card.Header className="card-header-personal-review"><img
            src={image}
            width="40px"
            height="40px"
            alt="profile picture"
            className="personal-review-image"
          ></img>{username}
          <button
          className="edit-review-btn"
          disabled={review===undefined}
          onClick={() => setRevealReviewForm(true)}
        >
          <IonIcon icon={createOutline}></IonIcon><span className="mobile-disappear">Edit</span>
        </button>
        </Card.Header>
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
  }
  else{
    <></>
  }
};

export default CustomerReviewCard;
