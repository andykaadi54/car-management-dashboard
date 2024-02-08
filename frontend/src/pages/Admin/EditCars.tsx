import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface Car {
  name: string;
  price: string;
  image: File | string;
  created_at: string;
  updated_at: string;
}

const EditCars: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [car, setCar] = useState<Car>({
		name: "",
		price: "",
		image: "",
		created_at: "",
		updated_at: "",
	});

	const getCar = async (): Promise<void> => {
		setIsLoading(true);
		try {
			const response = await axios.get<Car>(`http://localhost:3000/cars/${id}`);
			setCar(response.data);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			if (error instanceof Error) {
				toast.error(`Error: ${error.message}`);
			} else {
				toast.error("An unknown error occurred");
			}
		}
	};

	const updateCar = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const authToken = localStorage.getItem("token");

			const formData = new FormData();
			formData.append("name", car.name);
			formData.append("price", car.price);
			if (typeof car.image !== "string") {
				formData.append("image", car.image);
			}

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
			if (axios.isAxiosError(error)) {
				if (error.response) {
					// Kesalahan respons dari server dengan status code di luar 2xx
					toast.error(`Error: ${error.response.data.error}`);
				} else if (error.request) {
					// Tidak mendapatkan respons dari server
					toast.error("Error: No response from server");
				} else {
					// Kesalahan lainnya
					toast.error(`Error: ${error.message}`);
				}
			}
		}
	};

	const handleCancel = (): void => {
		navigate("/admin/cars/");
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files?.[0];
		if (file) {
			setCar((prevCar) => ({ ...prevCar, image: file }));
		}
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
											onChange={(e: ChangeEvent<HTMLInputElement>) =>
												handleFileChange(e)
											}
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
