import LaundryPagination from '../components/laundry-pagination';
import useLaundry from '../hooks/useLaundry';
import NavbarCustomer from '../../../partials/navbarCustomer';
import Loader from '../../../partials/loader';
import '../assets/css/laundry.css';
import { IonIcon } from '@ionic/react';
import { searchCircleOutline } from 'ionicons/icons';

const LaundryPage = () => {
  const {filteredLaundry,searchTerm,handleSearchTerm,isLoading}=useLaundry();

  if(!isLoading){
    return (
      <div className='laundry-container'>
        <NavbarCustomer/>
        <section>
          <div className="laundry-content">
            <div className="d-flex justify-content-center search">
              <div className="inputbox searchbar">
                <IonIcon icon={searchCircleOutline}></IonIcon>
                <input
                  type="search"
                  className="me-2"
                  placeholder='Search For A Laundry'
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => handleSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <LaundryPagination laundries={filteredLaundry}/>
          </div>
        </section>
      </div>
    );
  }
  else{
    return (
      <Loader/>
    )
  }
};

export default LaundryPage;