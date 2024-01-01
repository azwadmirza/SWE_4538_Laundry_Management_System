import { Card } from "react-bootstrap";
import { clothes } from "../../../assets/ts/clothes";

interface OrderCardComponents {
  laundryName: string;
  clothes: clothes[] | undefined;
  price: number;
}

const OrderDetailsCard = ({ laundryName, clothes }: OrderCardComponents) => {
  return (
    <Card className="order-card">
      <Card.Header>
        <span className="title">{laundryName}</span>
      </Card.Header>
      <Card.Body>
        <div className="d-flex mx-auto w-100">
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tbody>
              <tr
                style={{
                  backgroundColor: "#103686",
                  color: "white",
                  border: "1px solid #dddddd",
                  textAlign: "left",
                  padding: "8px",
                }}
              >
                <td>Name</td>
                <td>Service</td>
                <td>Quantity</td>
                <td>Unit Price</td>
              </tr>
              {clothes?.map((cloth) => (
                <tr
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "left",
                    padding: "8px",
                  }}
                >
                  <td>{cloth.name}</td>
                  <td>{cloth.service}</td>
                  <td>{cloth.quantity.toString()}</td>
                  <td>{cloth.unitPrice.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

export default OrderDetailsCard;
