import { Table } from "react-bootstrap";
import NavbarCustomer from "../../../partials/navbarCustomer";
import Loader from "../../../partials/loader";
import "../assets/css/cloth.css";
import ReviewOrder from "../components/review-laundry";
import AddNewOrder from "../components/add-new-order";
import { useLaundryDetails } from "../hooks/useLaundryDetails";
import PromotionalVideo from "../components/promo";

const LaundryDetails = () => {
  const { id, laundryImage, laundryName, items, isLoading, promo } =
    useLaundryDetails();

  if (!isLoading) {
    return (
      <div className="laundry-details-container">
        <NavbarCustomer />
        <section>
          <div className="laundry-details-content">
            <div className="video">
            {promo && (
              <PromotionalVideo promo={promo}/>
            )}
            </div>
            <AddNewOrder items={items} />
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
                {items &&
                  items.map((item) => (
                    <tr key={item.ClothType}>
                      <td>{item.ClothType}</td>
                      <td>
                        {item.Wash !== null && item.Wash !== 0
                          ? `৳ ${item.Wash}`
                          : "N/A"}
                      </td>
                      <td>
                        {item.Iron !== null && item.Iron !== 0
                          ? `৳ ${item.Iron}`
                          : "N/A"}
                      </td>
                      <td>
                        {item.WashAndIron !== null && item.WashAndIron !== 0
                          ? `৳ ${item.WashAndIron}`
                          : "N/A"}
                      </td>
                      <td>
                        {item.DryClean !== null && item.DryClean !== 0
                          ? `৳ ${item.DryClean}`
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <ReviewOrder
            _id={id}
            laundryImage={laundryImage}
            laundryName={laundryName}
          />
        </section>
      </div>
    );
  } else {
    return <Loader />;
  }
};
export default LaundryDetails;
