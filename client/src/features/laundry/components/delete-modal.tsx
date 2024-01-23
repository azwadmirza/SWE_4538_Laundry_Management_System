import { Modal } from "react-bootstrap";
import ModalProps from "../../../assets/ts/modal";
import axios from "axios";

interface IDeleteModal extends ModalProps{
    _id:string|undefined
}

const DeleteModal = ({_id,show,setShow}:IDeleteModal) => {
    const handleReviewDelete=async()=>{
        await axios.delete(import.meta.env.VITE_SERVER+'/api/review/'+_id,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        }).then((res)=>{
            console.log(res.data);
            setShow(false);
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    }

    return ( 
        <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header style={{backgroundColor:"#103686",color:"whitesmoke"}} closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
        <Modal.Footer><button className="w-100 custom-button full-width" onClick={()=>handleReviewDelete()}>Delete Review</button></Modal.Footer>
        </Modal>
     );
}
 
export default DeleteModal;