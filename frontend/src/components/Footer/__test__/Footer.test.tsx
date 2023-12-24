import { render } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import Footer from "..";

test("renders footer content correctly", () => {
	const { getByText, getByAltText } = render(<Footer />);

	expect(getByText("Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000")).toBeInTheDocument();
	expect(getByText("binarcarrental@gmail.com")).toBeInTheDocument();
	expect(getByText("081-233-334-808")).toBeInTheDocument();

	expect(getByText("Our Services")).toBeInTheDocument();
	expect(getByText("Why Us")).toBeInTheDocument();
	expect(getByText("Testimonial")).toBeInTheDocument();
	expect(getByText("FAQ")).toBeInTheDocument();

	expect(getByText("Connect with us")).toBeInTheDocument();
	expect(getByAltText("list-item")).toBeInTheDocument();

	expect(getByText("Copyright Binar 2022")).toBeInTheDocument();
	expect(getByAltText("logo")).toBeInTheDocument();
});