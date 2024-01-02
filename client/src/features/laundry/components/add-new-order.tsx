import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import { useState } from "react";
import AddOrderModal from "./add-order-modal";

export interface IItems{
    ClothType: string;
    Wash: number;
    Iron: number;
    WashAndIron: number;
    DryClean: number;
    Quantity:number|undefined;
    Type:string|"None";
}

interface IAddNewOrder{
    items: IItems[];
}

const AddNewOrder = ({items}:IAddNewOrder) => {
  const [show,setShow]=useState(false);
  return (
    <div className="table new-order-table">
        <AddOrderModal show={show} setShow={setShow} items={items}/>
      <div className="new-order">
        <div className="title">
          <h1>Add a new order</h1>
        </div>
        <div className="add-order-btn">
          <button className="add-order" onClick={() => setShow(!show)}>
            Add Order
            <IonIcon icon={addCircleOutline}></IonIcon>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AddNewOrder;