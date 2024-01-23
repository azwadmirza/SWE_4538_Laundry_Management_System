import { IonIcon } from "@ionic/react";
import { createOutline,trashBinOutline } from "ionicons/icons";
import { Card } from "react-bootstrap";
import StarsRating from "react-star-rate";
import ReviewCardProps from "../assets/ts/review-card";
import { useState } from "react";
import DeleteModal from "./delete-modal";

interface CustomerReviewCardProps extends ReviewCardProps{
  _id:string|undefined;
  reviewed:boolean;
  setRevealReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerReviewCard = ({_id,reviewed,setRevealReviewForm,image,username,review_stars,review}:CustomerReviewCardProps) => {
  const [show,setShow]=useState(false);
  if(reviewed){
    return (
      <Card className="card-review">
        <DeleteModal show={show} setShow={setShow} _id={_id}></DeleteModal>
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
        <button className="edit-review-btn" style={{marginRight:"10px",borderRadius:"50%",border:"none"}} onClick={()=>setShow(true)}><IonIcon icon={trashBinOutline}>Delete</IonIcon></button>
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
