import OrderCard from "../components/orderCard";
import PaginationComponent from "../../../components/pagination";
import { useOrder } from "../hooks/useOrder";
import NavbarCustomer from "../../../partials/navbarCustomer";
import '../assets/css/orders.css';
import Loader from "../../../partials/loader";

const MyOrders = () => {
  const {loading,displayedarrayComponents,totalPages,currentPage,handleFirstPageClick,handleLastPageClick,handleNextPageClick,handlePageChange,handlePrevPageClick}=useOrder();

  if(!loading){
    return (
      <div>
        <div className="mb-5">
          <NavbarCustomer />
        </div>
        <div className="my-orders d-flex justify-content-center w-100">
          <div className="d-flex flex-column custom-width-orders">
            {displayedarrayComponents.map((order) => (
              <OrderCard key={order.index} order={order} />
            ))}
              <PaginationComponent currentPage={currentPage} totalPages={totalPages} handleNextPageClick={handleNextPageClick} handleFirstPageClick={handleFirstPageClick} handlePageChange={handlePageChange} handlePrevPageClick={handlePrevPageClick} handleLastPageClick={handleLastPageClick}/>
          </div>
        </div>
        </div>
    );
  }
  else{
    return (<Loader/>)
  }
};

export default MyOrders;
