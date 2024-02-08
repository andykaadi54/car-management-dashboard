import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Aside from "..";

describe("Aside component", () => {
	test("renders Aside correctly", () => {
		const { getAllByAltText, getByText } = render(<Aside />);

		const dashboardLink = getByText("Dashboard");
		const carsLink = getByText("Cars");

		expect(dashboardLink).toBeInTheDocument();
		expect(carsLink).toBeInTheDocument();

		const images = getAllByAltText("dashboard");

		expect(images.length).toBe(2);

		expect(images[0]).toBeInTheDocument();
		expect(images[1]).toBeInTheDocument();
	});
});