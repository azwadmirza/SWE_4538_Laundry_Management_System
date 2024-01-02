import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { Card } from "react-bootstrap";
import StarsRating from "react-star-rate";

interface AverageReviewProps{
  image:string;
  laundryName:string;
  review_stars:number;
}

const AverageReview = ({review_stars,image,laundryName}:AverageReviewProps) => {
  return ( 
    <Card className="card-review">
      <Card.Header className="card-header-average-review"><img
          src={image}
          width="40px"
          height="40px"
          alt="profile picture"
          className="personal-review-image"
        ></img>{laundryName}
      </Card.Header>
      <Card.Body>
        <div className="container col-lg-12">
          <StarsRating
            classNamePrefix="avg-rating-stars col"
            value={isNaN(review_stars)?0:review_stars}
            disabled={true}
          />
          <p className="avg-rating col"><b>Average:</b> {isNaN(review_stars)?0:review_stars} / 5</p>
        </div>
      </Card.Body>
    </Card>
   );
}
 
export default AverageReview;