import { IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";
import ImageInput from "../../../partials/imageInput";
import { useCustomerSignUp } from "../hooks/useCustomerSignUp";
import { Card } from "react-bootstrap";
import "../assets/css/customer-signup.css";
import Loader from "../../../partials/loader";

const CustomerSignUp = () => {
  const {
    imageURL,
    setImage,
    phone_number,
    setPhoneNumber,
    loading,
    error,
    signup,
  } = useCustomerSignUp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup();
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Card className="customer-signup">
        <Card.Header>
          <h2>Customer Registration</h2>
        </Card.Header>
        <Card.Body>
          <div className="customer-signup-container">
            <div className="customer-signup-content">
              <form onSubmit={handleSubmit}>
                <ImageInput imageURL={String(imageURL)} setImage={setImage} />
                <div className="error">{error}</div>
                <div className="inputbox mx-auto">
                  <IonIcon icon={callOutline}></IonIcon>
                  <input
                    type="text"
                    pattern="[01]{2}[3-9]{1}[0-9]{8}"
                    id="phone"
                    name="phone"
                    required
                    value={phone_number}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <label htmlFor="">Phone Number</label>
                </div>
                <button
                  type="submit"
                  className="custom-button"
                  name="submit"
                  id="submit"
                >
                  Register
                </button>
              </form>
            </div>
            <div className="customer-signup-map"></div>
          </div>
        </Card.Body>
      </Card>
    );
  }
};

export default CustomerSignUp;
