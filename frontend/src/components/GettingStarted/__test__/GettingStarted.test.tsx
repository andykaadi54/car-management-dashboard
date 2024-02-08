import { render } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import GettingStarted from "..";

test("renders getting started content correctly", () => {
	const { getByText, getByTestId } = render(<GettingStarted />);

	expect(getByTestId("getting-started-section")).toBeInTheDocument();
	expect(getByTestId("getting-started-container")).toBeInTheDocument();

	expect(getByText("Sewa Mobil di (Lokasimu) Sekarang")).toBeInTheDocument();
	expect(getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.")).toBeInTheDocument();

	expect(getByText("Mulai Sewa Mobil")).toBeInTheDocument();
});