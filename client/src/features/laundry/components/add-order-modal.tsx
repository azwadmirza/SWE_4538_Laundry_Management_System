import { Modal } from "react-bootstrap";
import AddOrderOptions from "./add-order-options";
import { IItems } from "./add-new-order";
import axios from "axios";
import { useParams } from "react-router-dom";

type ModalProperty = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  items:IItems[];
};

const AddOrderModal = ({ show, setShow,items }: ModalProperty) => {
  const {id}=useParams();
  const handleAddOrder=async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const temp=items.filter((item)=>item.Quantity!==undefined && item.Quantity!==0 && item.Type!=="None");
      console.log(temp);
      await axios.post(import.meta.env.VITE_SERVER+'/api/add-order',{
        laundryManagerID:id,
        items_raw:temp
      },{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        }
      })
      .catch((err)=>{
        console.log(err);
      })
      setShow(false);
    }

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      className="new-order-modal"
    >
        <form className="add-order-form" onSubmit={(e)=>handleAddOrder(e)}>
      <Modal.Header closeButton>
        <div className="new-order new-order-header">
          <div className="title">
            <h1>Add a new order</h1>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body style={{ width: "100%" }}>
              {items && items.map((item)=>(
                <AddOrderOptions item={item}/>
              ))}
      </Modal.Body>
      <Modal.Footer>
      <button className="custom-button full-width" type="submit">
            Place Order
          </button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddOrderModal;