import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/landing.css';
import { arrowForwardCircleOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate=useNavigate();
  return ( 
  <div className="landing">
    <NavbarLanding/>
    <div className="landing-container">
        <div className="landing-card">
          <div className="landing-content">
            <span className="heading">Laundry Management System</span>
            <h1>Washify</h1>
            <p>
            Our project aims to digitalize the process of a laundry management
              system. This will make keeping track of orders and financial
              transactions easy, as well as promote effective communication
              between the customers and laundry employees.

            </p>
          </div>
          <div className="get-started">
            <button
              className="custom-button"
              onClick={() => navigate("/authentication")}
            >
              <span>Get Started</span>
              <IonIcon
                icon={arrowForwardCircleOutline}
                className="get-started-icon"
              ></IonIcon>
            </button>
          </div>
        </div>
      </div>
      <div className="landing-image">
        <img src="/landing-background.jpg" width="100%" alt="landing-background" />
      </div>
  </div>
   );
}
 
export default Landing;