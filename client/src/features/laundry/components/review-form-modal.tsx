
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import StarsRating from "react-star-rate";
import Loader from "../../../partials/loader";

type ReviewFormProps = {
  reviewed:boolean;
  revealForm:boolean;
  setRevealReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewForm = ({reviewed,revealForm,setRevealReviewForm }: ReviewFormProps) => {
  const {id}=useParams();
  const [customer, setCustomer] = useState<{
    username: string;
    email: string;
    profile_picture: string;
  }>();
  const [rating, setRating] = useState<number>(0);
  const [ratingEmpty, setRatingEmpty] = useState(false);
  const [review, setReview] = useState<string>("");
  const [editorContent, setEditorContent] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const editorRef = useRef<ReactQuill | null>(null);
  const [exceededCharCount, setExceededCharCount] = useState(false);
  const [loading,setLoading]=useState(true);
  const MAX_CHARACTERS = 250;

  const fetchCustomer = async () => {
    await axios.get(import.meta.env.VITE_SERVER+"/api/reviewer/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res)=>{
      setCustomer(res.data);
    })
    setLoading(false);
  }

  useEffect(()=>{
    fetchCustomer();
  },[])

  const handleRatingChange = (newRating: number | undefined) => {
    if (newRating !== undefined) {
      setRating(newRating);
      if (newRating !== 0) setRatingEmpty(false);
    }
  };
  const handleEditorChange = (content: string) => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      const text = quill.getText().trim();
      const strippedContent = text.replace(/<[^>]+>/g, "");
      const count = strippedContent.length;
      setEditorContent(content);
      setReview(strippedContent);
      setCharacterCount(strippedContent.length);
      if (count > MAX_CHARACTERS) setExceededCharCount(true);
      else setExceededCharCount(false);
    }
  };



  const checkEmptyRating = () => {
    if (rating === 0) {
      setRatingEmpty(true);
    } else {
      setRatingEmpty(false);
    }
  };

  const handleCancel = () => {
    setRevealReviewForm(false);
    setRating(0);
    setReview("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkEmptyRating();
    const url=reviewed?'/api/review/update':'/api/review/add';
    if(reviewed){
      await axios.put(import.meta.env.VITE_SERVER+url, {
        managerID:id,
        rev_stars:rating,
        review:review
      },{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`,
        }
      }).then(()=>{setRevealReviewForm(false);window.location.reload()}).catch((error)=>{
        console.log(error);
      })
    }
    else{
      await axios.post(import.meta.env.VITE_SERVER+url, {
        managerID:id,
        rev_stars:rating,
        review:review
      },{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`,
        }
      }).then(()=>{setRevealReviewForm(false);window.location.reload()}).catch((error)=>{
        console.log(error);
      })
    }

  };
  if(!loading){
    return (
      <Modal show={revealForm} onHide={()=>setRevealReviewForm(false)}>
        <Modal.Header closeButton className="header-color-modal">Review Laundry</Modal.Header>
        <Modal.Body>
        <div className="table new-review-form new-review-table">
        <form className=" add-review-form" onSubmit={handleSubmit}>
          <div className="review-details d-flex mx-auto">
            <img
              src={
                customer?.profile_picture
                  ? customer.profile_picture
                  : "/customerProfilePicture.jpg"
              }
              width="50px"
              height="50px"
              alt="profile picture"
            ></img>
            <h4>{customer?.username}</h4>
          </div>
  
          <div className="customer-rating">
            <StarsRating
              classNamePrefix="customer-rating-stars"
              value={rating}
              onChange={handleRatingChange}
              allowClear={false}
            />
            {ratingEmpty && (
              <span className="errorBox">
                *Field cannot be empty!
              </span>
            )}
          </div>
  
          <label htmlFor="review">Drop your review here</label>
          <ReactQuill
            className="editor"
            value={editorContent}
            ref={editorRef} 
            onChange={handleEditorChange}
            modules={{ toolbar: true }}
          />
          <p
            className={`show-character-count ${
              exceededCharCount ? "warning" : ""
            }`}
          >
             {characterCount}/{MAX_CHARACTERS}
          </p>
  
          <div className="d-flex mx-auto w-100">
          <div className="w-50">
          <button
            className='custom-button full-width'
            type="submit"
            disabled={exceededCharCount}
          >
            Submit Review
          </button>
          </div>
          <div className="w-50">
          <button className="custom-button full-width" onClick={() => handleCancel()}>
            Cancel
          </button>
          </div>
          </div>
        </form>
      </div>
        </Modal.Body>
      </Modal>
    );
  }
  else{
    return (<Loader/>)
  }
};

export default ReviewForm;
