import NavbarLaundry from "../../../partials/navbarLaundry";
import AverageReview from "../components/average-review-card";
import ViewReviews from "../components/view-reviews";
import '../assets/css/review.css';
import { useReviewsView } from "../hooks/useReviewsView";
import Loader from "../../../partials/loader";

const Review = () => {
    const {loading,reviews,totalReviews,managerName,managerProfilePicture}=useReviewsView();
    if(!loading){
        return ( 
            <div className="review-laundry">
                <NavbarLaundry/>
                <div className="reviews">
                <AverageReview review_stars={totalReviews} laundryName={managerName} image={import.meta.env.VITE_SERVER+"/uploads/"+managerProfilePicture}/>
                <ViewReviews reviews={reviews}/>
                </div>
            </div> );
    }
    else{
        return (<Loader/>)
    }
}
 
export default Review;