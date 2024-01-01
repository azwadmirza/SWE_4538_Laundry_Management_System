import CustomerSignUp from "../components/customerSignUp";
import '../assets/css/user.css';
import ManagerSignUp from "../components/managerSignUp";

interface UserProps{
  userType:string;
}

const User = ({userType}:UserProps) => {
  return ( 
    <div className="user">
      {(userType==="customer") && (<CustomerSignUp/>)}
      {(userType==="manager") && (<ManagerSignUp/>)}
    </div>
   );
}
 
export default User;