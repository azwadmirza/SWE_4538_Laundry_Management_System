import { Card } from "react-bootstrap";

interface IPromo{
    promo:string;
}

const PromotionalVideo = ({promo}:IPromo) => {
    return ( 
        <div className="video">
            <Card>
                <Card.Header style={{backgroundColor:"#103686",color:"whitesmoke"}}>Advertisement</Card.Header>
                <Card.Body>
                <video src={promo} controls width="100%" height="auto">
                Your browser does not support the video tag.
              </video>
                </Card.Body>
            </Card>
        </div>
     );
}
 
export default PromotionalVideo;