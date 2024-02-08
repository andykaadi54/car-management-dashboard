import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AddCars: React.FC = () => {
	const [name, setName] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const [image, setImage] = useState<File | null>(null);

	const navigate = useNavigate();

	const saveCars = async (e: FormEvent): Promise<void> => {
		e.preventDefault();
		if (name === "" || price === "" || image === null) {
			alert("Please fill out all input completely");
			return;
		}

		try {
			const authToken = localStorage.getItem("token");

			const formData = new FormData();
			formData.append("name", name);
			formData.append("price", price);
			formData.append("image", image);

			const response = await axios.post(
				"http://localhost:3000/cars/",
				formData,
				{
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				}
			);

			toast.success(`Save ${response.data.name} successfully`);
			navigate("/admin/cars/");
		} catch (error) {
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
			setImage(file);
		}
	};

	return (
		<>
			<div className="container mt-4 mx-5">
				<div className="d-flex justify-content-between align-items-center mb-4">
					<h1>Add Cars</h1>
				</div>

				<div style={{ backgroundColor: "#fff", padding: "40px" }}>
					<Form onSubmit={saveCars} encType="multipart/form-data">
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
										placeholder="Masukkan nama"
										value={name}
										onChange={(e) => setName(e.target.value)}
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
										placeholder="Masukkan Harga"
										value={price}
										onChange={(e) => setPrice(e.target.value)}
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
									<span>-</span>
								</Col>
							</Form.Group>

							<Form.Group as={Row} className="mb-3">
								<Form.Label column sm="2">
                  Updated at
								</Form.Label>
								<Col sm="5">
									<span>-</span>
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
				</div>
			</div>
		</>
	);
};

export default AddCars;
