import { IonIcon } from "@ionic/react";
import {
  callOutline,
  homeOutline,
  timeOutline,
  timerOutline,
  mapOutline,
} from "ionicons/icons";
import ImageInput from "../../../partials/imageInput";
import { Card } from "react-bootstrap";
import "../assets/css/manager-signup.css";
import { useManagerSignUp } from "../hooks/useManagerSignUp";
import Loader from "../../../partials/loader";

const ManagerSignUp = () => {
  const {
    imageURL,
    setImage,
    address,
    setAddress,
    opening_time,
    setOpeningTime,
    closing_time,
    setClosingTime,
    phone_number,
    setPhoneNumber,
    loading,
    error,
    signup,
  } = useManagerSignUp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup();
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Card className="manager-signup">
        <Card.Header>
          <h2>Laundry Registration</h2>
        </Card.Header>
        <Card.Body>
          <div className="manager-signup-container">
            <div className="manager-signup-content">
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
                <div className="inputbox mx-auto">
                  <IonIcon icon={timeOutline}></IonIcon>
                  <input
                    type="time"
                    name="openingTime"
                    id="openingTime"
                    value={opening_time}
                    onChange={(e) => setOpeningTime(e.target.value)}
                  />
                  <label htmlFor="openingTime">Opening Time</label>
                </div>
                <div className="inputbox mx-auto">
                  <IonIcon icon={timerOutline}></IonIcon>
                  <input
                    type="time"
                    name="closingTime"
                    id="closingTime"
                    value={closing_time}
                    onChange={(e) => setClosingTime(e.target.value)}
                    min={opening_time}
                  />
                  <label htmlFor="closingTime">Closing Time</label>
                </div>
                <div className="inputbox mx-auto">
                  <IonIcon icon={mapOutline}></IonIcon>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <label htmlFor="">Address</label>
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
            <div className="manager-signup-map"></div>
          </div>
        </Card.Body>
      </Card>
    );
  }
};

export default ManagerSignUp;
