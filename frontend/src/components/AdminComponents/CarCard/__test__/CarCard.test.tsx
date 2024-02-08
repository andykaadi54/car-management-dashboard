import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import "@testing-library/jest-dom/";
import axios from "axios";
import CarCard from "..";
import Swal from "sweetalert2";

jest.mock("axios", () => ({
	delete: jest.fn().mockResolvedValue({}),
}));

jest.mock("sweetalert2", () => ({
	fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

const mockCar = {
	id: 1,
	image: "car.jpg",
	name: "Test Car",
	price: 100,
	created_at: "2023-01-01",
	updated_at: "2023-01-02",
};

const mockGetCars = jest.fn();

describe("CarCard Component", () => {
	beforeEach(() => {
		render(<MemoryRouter>
			<CarCard car={mockCar} getCars={mockGetCars} />
		</MemoryRouter>);
	});

	test("renders car details correctly", () => {
		expect(screen.getByAltText("gambar-mobil")).toBeInTheDocument();
		expect(screen.getByText("Test Car")).toBeInTheDocument();
		expect(screen.getByText("Rp 100 / hari")).toBeInTheDocument();
		expect(screen.getByText("start rent 2023-01-01")).toBeInTheDocument();
		expect(screen.getByText("Updated at 2023-01-02")).toBeInTheDocument();
	});

	test("clicking delete button triggers confirmation modal", async () => {
		const deleteButton = screen.getByText("Delete");
		fireEvent.click(deleteButton);

		await waitFor(() => {
			expect(Swal.fire).toHaveBeenCalledWith({
				title: "Do you really want to delete the car?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			});
		});
	});

	test("clicking delete and confirming triggers deleteCar function", async () => {
		const deleteButton = screen.getByText("Delete");
		fireEvent.click(deleteButton);

		const confirmButton = await screen.findByRole("button", { name: /delete/i });
		fireEvent.click(confirmButton);

		await waitFor(() => {
			expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/cars/1", {
				headers: {
					Authorization: "Bearer null", 
				},
			});
			expect(mockGetCars).toHaveBeenCalled();
		});
	});
});