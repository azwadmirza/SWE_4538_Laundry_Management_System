import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import User from "./features/user-signup/pages/User";
import Verification from "./features/verification/pages/Verification";
import ChangePassword from "./features/profile/pages/change-password";
import ProfilePageForCustomers from "./features/profile/pages/customer";
import ProfilePageForLaundry from "./features/profile/pages/manager";
import Laundry from "./features/laundry/pages/laundry";
import LaundryDetails from "./features/laundry/pages/details";
import MyOrders from "./features/order-customer/pages/myOrders";
import Orders from "./features/order-laundry/pages/orders";
import Review from "./features/laundry-review/pages/Review";
import Price from "./features/laundry-pricing/pages/Price";
import Error404 from "./pages/error404";
import ForgotPassword from "./features/forgot-password/pages/forgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/customer/signup"
            element={<User userType="customer" />}
          />
          <Route path="/manager/signup" element={<User userType="manager" />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/change-password/:type" element={<ChangePassword />} />
          <Route
            path="/customer/profile"
            element={<ProfilePageForCustomers />}
          />
          <Route path="/laundry/profile" element={<ProfilePageForLaundry />} />
          <Route path="/customer/laundry" element={<Laundry />} />
          <Route
            path="/customer/laundry/details/:id"
            element={<LaundryDetails />}
          />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/customer/order" element={<MyOrders />} />
          <Route path="/laundry/order" element={<Orders />} />
          <Route path="/laundry/review" element={<Review />} />
          <Route path="/laundry/price" element={<Price />} />
          <Route path="/" element={<Landing />} />
          <Route path="/authentication" element={<SignIn />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
