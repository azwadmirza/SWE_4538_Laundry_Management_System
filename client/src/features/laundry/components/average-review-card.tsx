import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { Card } from "react-bootstrap";
import StarsRating from "react-star-rate";

interface AverageReviewProps{
  image:string|undefined;
  laundryName:string|undefined;
  disabled:boolean;
  review_stars:number;
  setRevealReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AverageReview = ({disabled,review_stars,image,laundryName,setRevealReviewForm}:AverageReviewProps) => {
  return ( 
    <Card className="card-review">
      <Card.Header className="card-header-average-review"><img
          src={image}
          width="40px"
          height="40px"
          alt="profile picture"
          className="personal-review-image"
        ></img>{laundryName}
        <button
        className="edit-average-review-btn"
        disabled={disabled}
        onClick={() => setRevealReviewForm(true)}
      >
        <IonIcon icon={addCircleOutline}></IonIcon><span className="mobile-disappear">Create</span>
      </button></Card.Header>
      <Card.Body>
        <div className="container col-lg-12">
          <StarsRating
            classNamePrefix="avg-rating-stars col"
            value={!review_stars?0:review_stars}
            disabled={true}
          />
          <p className="avg-rating col"><b>Average:</b> {!review_stars?0:review_stars} / 5</p>
        </div>
      </Card.Body>
    </Card>
   );
}
 
export default AverageReview;