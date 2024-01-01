import { useState } from "react";
import '../assets/css/profile-picture.css';
import UploadImage from "../components/uploadImage";

type ImageInputProps={
  imageURL:string|undefined,
  setImage:React.Dispatch<React.SetStateAction<File | undefined>>,
}

const ImageInput=({imageURL,setImage}:ImageInputProps)=>{
  const [show, setShow] = useState(false);
  return (
    <div className="profile-picture-container">
      <img src={imageURL} alt="profile-picture"/>
      <p className="edit-profile-picture" onClick={() => setShow(true)}>Edit</p>
      <UploadImage modal={{show,setShow}} setImage={setImage} />
    </div>
  );
}

export default ImageInput;