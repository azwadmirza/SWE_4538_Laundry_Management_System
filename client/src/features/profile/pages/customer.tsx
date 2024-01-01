import { useEffect, useState } from 'react';
import NavbarCustomer from '../../../partials/navbarCustomer';
import ProfileFormCustomer from '../components/customer-form';
import ImageInput from '../../../partials/imageInput';
import Loader from '../../../partials/loader';
import '../assets/css/profile.css';
import useCustomerForm from '../hooks/useCustomerForm';

const  ProfilePageForCustomers = () => {
  const [isDisabled,turnOnEdit]=useState<boolean>(true);
  const {imageURL,setImage,username,setUsername,password,setPassword,phone,setPhoneNumber,isLoading,error,handleSubmit}=useCustomerForm();

    if(!isLoading){
      return (     
        <div>
          <NavbarCustomer/>
          <section>
          <div className="container h-100">
            <div className="pt-5">
          <div className="mt-5 d-lg-none d-flex justify-content-center"><ImageInput imageURL={String(imageURL)} setImage={setImage} /></div></div>
            <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
            <div className="my-3 d-none d-lg-flex"><ImageInput imageURL={String(imageURL)} setImage={setImage} /></div>
              <div className="profile-form-outer w-50 mt-5">
                <ProfileFormCustomer handleSubmit={handleSubmit} turnOnEdit={turnOnEdit} email="mirzaazwad8@gmail.com" username={username} setUsername={setUsername} isLoading={isLoading} isDisabled={isDisabled} error={error?error:""} phone={phone} password={password} setPassword={setPassword} setPhoneNumber={setPhoneNumber}/>
              </div>
            </div>
          </div>
          </section>  
          </div>
        );
    }
    else{
      return(
        <Loader/>
      )
    }
  }
   
  export default  ProfilePageForCustomers;

