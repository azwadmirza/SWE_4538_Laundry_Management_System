import Form from "react-bootstrap/Form";
import { useState } from "react";

import ForgotPasswordEmailVerify from "./forgotPasswordEmailVerify";
import { IonIcon } from "@ionic/react";
import { mailOutline } from "ionicons/icons";
import axios from "axios";

const ForgotPasswordSendEmail = () => {
  const [emailSent, isEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("customer");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .get(import.meta.env.VITE_SERVER + "/api/forgot/" + email)
      .then(() => {
        setIsDisabled(true);
        isEmailSent(true);
      })
      .catch((err) => setErrorMessage(err.error));
  };
  if (!emailSent) {
    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
        <div className="radio-button-group">
              <button
                className={`radio-button ${
                  userType === "manager" ? "radio-button" : "radio-button-outline"
                }`}
                onClick={() => setUserType("manager")}
              >
                Manager
              </button>
              <button
                className={`radio-button ${
                  userType === "customer"
                    ? "radio-button"
                    : "radio-button-outline"
                }`}
                onClick={() => setUserType("customer")}
              >
                Customer
              </button>
            </div>
        <Form.Group>
          <div className="errorMessage" style={{ color: "red" }}></div>
        </Form.Group>
        <div className="errorBox" style={{ color: "red" }}>
          <p>{errorMessage}</p>
        </div>
        <div className="inputbox">
          <IonIcon icon={mailOutline}></IonIcon>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="">Email</label>
        </div>

        <div className="justify-content-center w-100">
          <button
            type="submit"
            className="custom-button full-width"
            disabled={isDisabled}
          >
            Send Recovery Email
          </button>
        </div>
      </Form>
    );
  } else {
    return <ForgotPasswordEmailVerify email={email} role={userType} />;
  }
};

export default ForgotPasswordSendEmail;
