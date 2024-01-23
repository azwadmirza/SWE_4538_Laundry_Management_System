import NavbarLaundry from "../../../partials/navbarLaundry";
import { Table } from "react-bootstrap";
import { IonIcon } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import AddItem from "../components/add-item";
import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/price.css";
import Loader from "../../../partials/loader";
interface ClothTypeData {
  ClothType: string;
  Wash: number;
  Iron: number;
  WashAndIron: number;
  DryClean: number;
}

const Price = () => {
    const [show, setShow] = useState(false);
    const [curr_index, setIndex] = useState(-1);
    const [value, setValue] = useState(0);
    const [currentOperation, setCurrentOperation] = useState("");
    const [pricing, setPricing] = useState<ClothTypeData[]>([]);
    const [loading,setLoading]=useState<boolean>(true);
    const [error,setError]=useState<string>("");

    const fetchPricing = async () => {
      await axios.get(import.meta.env.VITE_SERVER+"/api/manager/get-pricing-details",{
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      }).then((res)=>{
        setPricing(res.data.pricingDetails?res.data.pricingDetails:[]);
        setLoading(false);
      }
      ).catch((err)=>{
        setLoading(false);
        console.log(err);
      });
    }

    useEffect(()=>{
      fetchPricing();
    },[])

  
    const updatePricing = async () => {
        await axios
          .patch(import.meta.env.VITE_SERVER+"/api/order/update-pricing", {
            pricing: pricing,
          },{
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          })
          .then((res) => {
            console.log(res);
            setPricing(pricing);
            setIndex(-1);
          })
          .catch((err) => {
            console.log(err);
          });
    };
  
    const changeValue = (e: string, index: number, operation: string) => {
      setValue(Number(e));
      let temp_pricing: {
        ClothType: string;
        Wash: number;
        Iron: number;
        WashAndIron: number;
        DryClean: number;
      }[] = [...pricing];
      if (operation === "Wash") {
        temp_pricing[index].Wash = Number(e);
      } else if (operation === "Iron") {
        temp_pricing[index].Iron = Number(e);
      } else if (operation === "Wash & Iron") {
        temp_pricing[index].WashAndIron = Number(e);
      } else {
        temp_pricing[index].DryClean = Number(e);
      }
      setPricing(temp_pricing);
    };

    if(!loading){
      return ( 
        <div className="set-pricing">
            <NavbarLaundry/>
            <div className="pricing">
          <div className="pricing-container">
            <div className="main">
              <AddItem
                show={show}
                setShow={setShow}
                pricing={pricing}
                setPricing={setPricing}
                manager_email={"email"}
                setError={setError}
              />
              <div className="table new-order-table">
                <div className="new-order">
                  <div className="title">
                    <h1>Add New Item</h1>
                  </div>
                  <div className="add-order-btn">
                    <button className="add-order" onClick={() => setShow(true)}>
                      Add Item
                      <IonIcon icon={addCircleOutline}></IonIcon>
                    </button>
                  </div>
                </div>
              </div>
              <div className="error" style={{color:"red"}}>
                <p>{error}</p>
              </div>
              <Table striped bordered hover className="pricing-table">
                <thead>
                  <tr>
                    <h2>Pricing Chart</h2>
                  </tr>
                  <tr>
                    <th>
                      {" "}
                      <h5>Cloth</h5>{" "}
                    </th>
                    <th>
                      {" "}
                      <h5>Wash</h5>{" "}
                    </th>
                    <th>
                      {" "}
                      <h5>Iron</h5>{" "}
                    </th>
                    <th>
                      {" "}
                      <h5>Wash And Iron</h5>{" "}
                    </th>
                    <th>
                      {" "}
                      <h5>Dry Clean</h5>{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pricing && pricing.map((price, index) => (
                    <tr>
                      <td>{price.ClothType}</td>
                      <td
                        onClick={() => {
                          setIndex(index);
                          setValue(price.Wash);
                          setCurrentOperation("Wash");
                        }}
                      >
                        <input
                          type={
                            curr_index === index && currentOperation === "Wash"
                              ? "number"
                              : "text"
                          }
                          value={
                            curr_index === index && currentOperation === "Wash"
                              ? value
                              : price.Wash !== null && price.Wash !== 0
                              ? price.Wash
                              : 0
                          }
                          onChange={(e) =>
                            changeValue(e.target.value, index, "Wash")
                          }
                          onClick={() => {
                            setIndex(index);
                            setValue(price.Wash);
                            setCurrentOperation("Wash");
                          }}
                          disabled={
                            !(curr_index === index && currentOperation === "Wash")
                          }
                        />
                      </td>
                      <td
                        onClick={() => {
                          setIndex(index);
                          console.log("index: ", curr_index);
                          setValue(price.Iron);
                          setCurrentOperation("Iron");
                          console.log("operation: ", currentOperation);
                        }}
                      >
                        <input
                          type={
                            curr_index === index && currentOperation === "Iron"
                              ? "number"
                              : "text"
                          }
                          value={
                            curr_index === index && currentOperation === "Iron"
                              ? value
                              : price.Iron !== null && price.Iron !== 0
                              ? price.Iron
                              : 0
                          }
                          onChange={(e) =>
                            changeValue(e.target.value, index, "Iron")
                          }
                          disabled={
                            !(curr_index === index && currentOperation === "Iron")
                          }
                        />
                      </td>
                      <td
                        onClick={() => {
                          setIndex(index);
                          setValue(price.WashAndIron);
                          setCurrentOperation("Wash & Iron");
                        }}
                      >
                        <input
                          type={
                            curr_index === index &&
                            currentOperation === "Wash & Iron"
                              ? "number"
                              : "text"
                          }
                          value={
                            curr_index === index &&
                            currentOperation === "Wash & Iron"
                              ? value
                              : price.WashAndIron !== null &&
                                price.WashAndIron !== 0
                              ? price.WashAndIron
                              : 0
                          }
                          onChange={(e) =>
                            changeValue(e.target.value, index, "Wash & Iron")
                          }
                          disabled={
                            !(
                              curr_index === index &&
                              currentOperation === "Wash & Iron"
                            )
                          }
                        />
                      </td>
                      <td
                        onClick={() => {
                          setIndex(index);
                          setValue(price.DryClean);
                          setCurrentOperation("Dry Clean");
                        }}
                      >
                        <input
                          type={
                            curr_index === index && currentOperation === "Dry Clean"
                              ? "number"
                              : "text"
                          }
                          value={
                            curr_index === index && currentOperation === "Dry Clean"
                              ? value
                              : price.DryClean !== null && price.DryClean !== 0
                              ? price.DryClean
                              : 0
                          }
                          onChange={(e) =>
                            changeValue(e.target.value, index, "Dry Clean")
                          }
                          disabled={
                            !(
                              curr_index === index &&
                              currentOperation === "Dry Clean"
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="w-100">
                  <button className="custom-button full-width" onClick={updatePricing}>
                    Set Price
                  </button>
                </tfoot>
              </Table>
            </div>
          </div>
        </div>
        </div> )
    }
    else{
      return (
        <Loader/>
      )
    }
}
 
export default Price;



