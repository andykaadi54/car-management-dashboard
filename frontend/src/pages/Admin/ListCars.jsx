import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CarCard from "../../components/AdminComponents/CarCard";

const ListCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCars = async () => {
    try {
      setIsLoading(true);
      const response = await axios("http://localhost:3000/cars/");
      console.log(response.data);
      setCars(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <div className="container mt-4 mx-2">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>List Car</h1>
        <Link to="/admin/cars/add" className="text-decoration-none">
          <Button className="btn btn-primary mt-4 shadow-sm rounded-sm px-4 py-2 font-weight-bold">
            <Plus size={20} className="mr-1" />
            Add New Car
          </Button>
        </Link>
      </div>

      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <>
            {cars.length > 0 ? (
              <>
                <div className="row g-3">
                  {cars.map((car, index) => (
                    <CarCard key={index} car={car} getCars={getCars} />
                  ))}
                </div>
              </>
            ) : (
              <div>There is no product</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListCars;
