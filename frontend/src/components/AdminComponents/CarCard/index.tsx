import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash, Pencil } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import ActionButton from "../ActionButton";

interface CarCardProps {
  car: {
    id: number;
    image: string;
    name: string;
    price: number;
    created_at: string;
    updated_at: string;
  };
  getCars: () => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, getCars }) => {
	const { id, image, name, price, created_at, updated_at } = car;

	const deleteCar = async (carId: number): Promise<void> => {
		const result = await Swal.fire({
			title: "Do you really want to delete the car?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		});

		if (result.isConfirmed) {
			try {
				const authToken = localStorage.getItem("token");

				await axios.delete(`http://localhost:3000/cars/${carId}`, {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});

				toast.success("Delete a product successfully");
				getCars();
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
		}
	};

	return (
		<div className="col-lg-3 col-md-6">
			<div className="why-us-card-body">
				<img src={image} alt="gambar-mobil" />
				<p>{name}</p>
				<h5>{`Rp ${price} / hari`}</h5>
				<p>{`start rent ${created_at}`}</p>
				<p>Updated at {updated_at}</p>
				<div className="d-flex gap-1">
					<ActionButton
						variant="outline-danger"
						icon={<Trash size={20} />}
						text="Delete"
						onClick={() => deleteCar(id)}
					/>

					<Link to={`edit/${id}`} className="text-decoration-none">
						<ActionButton
							variant="success"
							icon={<Pencil size={20} />}
							text="Edit"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CarCard;
