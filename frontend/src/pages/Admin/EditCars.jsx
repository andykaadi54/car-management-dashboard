import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCars = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [car, setCar] = useState({
    name: "",
    price: "",
    image: "",
    created_at: "",
    updated_at: "",
  });

  const getCar = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`http://localhost:3000/cars/${id}`);
      setCar({
        name: response.data.name,
        price: response.data.price,
        image: response.data.image,
        created_at: response.data.created_at,
        updatedAt: response.data.updated_at,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const updateCar = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const authToken = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", car.name);
      formData.append("price", car.price);
      formData.append("image", car.image);

      await axios.put(`http://localhost:3000/cars/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Update a car successfully");
      navigate("/admin/cars/");
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        toast.error(`Error: ${error.response.data.error}`);
      } else if (error.request) {
        toast.error("Error: No response from server");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const handleCancel = () => {
    navigate("/admin/cars/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCar((prevCar) => ({
      ...prevCar,
      image: file,
    }));
  };

  useEffect(() => {
    getCar();
  }, []);

  return (
    <>
      <div className="container mt-4 mx-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Update Car</h1>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "40px" }}>
          {isLoading ? (
            "Loading"
          ) : (
            <Form onSubmit={updateCar} encType="multipart/form-data">
              <div className="mb-5">
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextName"
                >
                  <Form.Label column sm="2">
                    Nama
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type="text"
                      value={car.name}
                      onChange={(e) => setCar({ ...car, name: e.target.value })}
                      placeholder="Masukkan nama"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextHarga"
                >
                  <Form.Label column sm="2">
                    Harga
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type="number"
                      value={car.price}
                      onChange={(e) =>
                        setCar({ ...car, price: e.target.value })
                      }
                      placeholder="Masukkan Harga"
                    />
                  </Col>
                </Form.Group>

                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextFoto"
                >
                  <Form.Label column sm="2">
                    Foto
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </Col>
                </Form.Group>
              </div>

              <div className="mb-5">
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Start Rent
                  </Form.Label>
                  <Col sm="5">
                    <span>-</span>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Finish Rent
                  </Form.Label>
                  <Col sm="5">
                    <span>-</span>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Created at
                  </Form.Label>
                  <Col sm="5">
                    <span>{car.created_at}</span>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Updated at
                  </Form.Label>
                  <Col sm="5">
                    <span>{car.updated_at}</span>
                  </Col>
                </Form.Group>
              </div>

              <div className="d-flex gap-2">
                <Button
                  variant="outline-primary"
                  className="d-flex align-items-center"
                  onClick={handleCancel}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="d-flex align-items-center"
                >
                  <span>Save</span>
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  );
};
export default EditCars;
