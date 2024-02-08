import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/"; 
import MainSection from "..";

test("renders main section content correctly", () => {
	const { getByText, getByTestId } = render(
		<Router>
			<MainSection />
		</Router>
	);

	expect(getByTestId("main-section")).toBeInTheDocument();
	expect(getByText("BCR")).toBeInTheDocument();
	expect(getByText("Our Services")).toBeInTheDocument();
	expect(getByText("Why Us")).toBeInTheDocument();
	expect(getByText("Testimonial")).toBeInTheDocument();
	expect(getByText("FAQ")).toBeInTheDocument();
	expect(getByText("Register")).toBeInTheDocument();

	expect(getByText("Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)")).toBeInTheDocument();
	expect(
		getByText(
			"Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam."
		)
	).toBeInTheDocument();

	const buttonSewa = getByTestId("btn-sewa");
	expect(buttonSewa).toBeInTheDocument();
	fireEvent.click(buttonSewa);
});