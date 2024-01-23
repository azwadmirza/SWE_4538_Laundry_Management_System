import { Link } from "react-router-dom";
import LaundryCard from "./laundry-card";
import LaundryArray from "../assets/ts/laundry-array-display";
import PaginationComponent from "../../../components/pagination";
import { usePagination } from "../../../hooks/usePagination";

const PharmacyPagination = ({laundries}:LaundryArray) => {
  const {displayedarrayComponents,currentPage,totalPages,handlePageChange,handleNextPageClick,handlePrevPageClick,handleFirstPageClick,handleLastPageClick}=usePagination(laundries,8);

  return (
    <div>
      <div className="row">
        {displayedarrayComponents!==undefined && displayedarrayComponents.map((laundry) => (
            <div
              className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4"
              key={laundry._id}
            >
              <Link
                to={`/customer/laundry/details/${laundry._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <LaundryCard
                  name={laundry.username}
                  address={laundry.address}
                  image={laundry.profilePicture}
                />
              </Link>
            </div>
          ))}
      </div>
      <PaginationComponent currentPage={currentPage} totalPages={totalPages} handleNextPageClick={handleNextPageClick} handleFirstPageClick={handleFirstPageClick} handlePageChange={handlePageChange} handlePrevPageClick={handlePrevPageClick} handleLastPageClick={handleLastPageClick}/>
    </div>
  );
};

export default PharmacyPagination;
