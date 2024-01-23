import { useState } from "react";
import Login from "../components/login";
import SignUp from "../components/signup";
import NavbarLanding from "../partials/navbarLanding";
import '../assets/css/signin.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

const SignIn = () => {
  const[location,setLocation]=useState<string>("Login");
  console.log(import.meta.env);
  return ( 
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
  <div className="signin">
    <NavbarLanding/>
    {location==="Login" && (<Login changeState={setLocation}/>)}
    {location==="SignUp" && (<SignUp changeState={setLocation}/>)}
  </div>
  </GoogleOAuthProvider>
   );
}
 
export default SignIn;