import { Modal } from "react-bootstrap";
import ModalProps from "../assets/ts/modal";
import { useGoogleContinue } from "../hooks/useGoogleContinue";
import { IonIcon } from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import Loader from "../partials/loader";

const GoogleContinueModal = ({ show, setShow }: ModalProps) => {
  const { googleLogin, errorGoogle, isLoadingGoogle,role,setRole } = useGoogleContinue();
  if (isLoadingGoogle) {
    return <Loader />;
  } else {
    return (
      <Modal onHide={() => setShow(false)} show={show}>
        <Modal.Header closeButton style={{backgroundColor:"#103686",color:"whitesmoke"}}>
          <Modal.Title>Google oAuth</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="errorbox" style={{color:"red"}}>
                {errorGoogle}
            </div>
            <div className="radio-button-group">
            <button
              className={`radio-button ${
                role === "manager" ? "radio-button" : "radio-button-outline"
              }`}
              onClick={() => setRole("manager")}
            >
              Manager
            </button>
            <button
              className={`radio-button ${
                role === "customer"
                  ? "radio-button"
                  : "radio-button-outline"
              }`}
              onClick={() => setRole("customer")}
            >
              Customer
            </button>
          </div>
          <button
            className="custom-button full-width"
            onClick={() => googleLogin()}
          >
            <IonIcon icon={logoGoogle} />
            <span>Continue with Google</span>
          </button>
        </Modal.Body>
      </Modal>
    );
  }
};

export default GoogleContinueModal;
