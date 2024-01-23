import { Modal } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { MdOutlineDryCleaning, MdOutlineIron } from "react-icons/md";
import { TbIroningSteam } from "react-icons/tb";
import { shirtOutline, waterOutline } from "ionicons/icons";
import { useState } from "react";
import axios from "axios";
interface IModalProperty {
    show: boolean;
    manager_email: string;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    pricing: {
        ClothType: string;
        Wash: number;
        Iron: number;
        WashAndIron: number;
        DryClean: number;
    }[];
    setPricing: React.Dispatch<
        React.SetStateAction<
            {
                ClothType: string;
                Wash: number;
                Iron: number;
                WashAndIron: number;
                DryClean: number;
            }[]
        >
    >;
}



const AddItem = ({ show, setShow, pricing, setPricing,setError }: IModalProperty) => {
  const [label, setLabel] = useState("");
  const [wash, setWash] = useState("");
  const [iron, setIron] = useState("");
  const [washAndIron, setWashAndIron] = useState("");
  const [dryClean, setDryClean] = useState("");

  const addNewItems = async () => {
    await axios
          .post(import.meta.env+"/api/order/add-pricing", {
            pricing: {
              ClothType: label,
              Wash: Number(wash),
              Iron: Number(iron),
              WashAndIron: Number(washAndIron),
              DryClean: Number(dryClean),
            },
          },{
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            },
          })
          .then((res) => {
            console.log(res);
            setPricing(pricing);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setShow(false);
      if(pricing.find((item) => item.ClothType === label)){
        setError("Item Already Exists");
        return;
      }
      await addNewItems();
      setPricing([
        ...pricing,
        {
          ClothType: label,
          Wash: Number(wash),
          Iron: Number(iron),
          WashAndIron: Number(washAndIron),
          DryClean: Number(dryClean),
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <div className="new-order">
            <div className="title">
              <h1>Add Item</h1>
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="add-item-modal-body">
          <div className="inputbox">
            <IonIcon icon={shirtOutline}></IonIcon>
            <input
              type="text"
              id="item-label"
              name="item-label"
              className="item-label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
            <label htmlFor="item-label">Item Label</label>
          </div>
          <div className="inputbox">
            <IonIcon icon={waterOutline}></IonIcon>
            <input
              type="number"
              className="item-wash"
              min="0"
              id="wash"
              name="wash"
              value={wash}
              onChange={(e) => setWash(e.target.value)}
            />
            <label htmlFor="wash">Washing Price</label>
          </div>
          <div className="inputbox">
            <MdOutlineIron className="custom-icon" />
            <input
              type="number"
              min="0"
              className="item-iron"
              id="iron"
              name="iron"
              value={iron}
              onChange={(e) => setIron(e.target.value)}
            />
            <label htmlFor="iron">Ironing Price</label>
          </div>
          <div className="inputbox">
            <TbIroningSteam  className="custom-icon" />
            <input
              type="number"
              className="item-wash-n-iron"
              min="0"
              id="washAndIron"
              name="washAndIron"
              value={washAndIron}
              onChange={(e) => setWashAndIron(e.target.value)}
            />
            <label htmlFor="washAndIron">Washing and Ironing Price</label>
          </div>
          <div className="inputbox">
            <MdOutlineDryCleaning  className="custom-icon" />
            <input
              type="number"
              className="item-dryclean"
              min="0"
              id="dryClean"
              name="dryClean"
              value={dryClean}
              onChange={(e) => setDryClean(e.target.value)}
            />
            <label htmlFor="dryClean">Dry Cleaning Price</label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="custom-button full-width">
            Add Item
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default AddItem;