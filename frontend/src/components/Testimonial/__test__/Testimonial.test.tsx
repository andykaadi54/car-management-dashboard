import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import Testimonial from "..";

test("renders testimonial content correctly", () => {
	const { getByText, getByAltText, getAllByAltText } = render(<Testimonial />);

	const desktopSection = getByText("Testimonial");
	expect(desktopSection).toBeInTheDocument();

	const mobileSection = getByText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod");
	expect(mobileSection).toBeInTheDocument();

	const images = getAllByAltText("img-photo");
	expect(images.length).toBe(4);

	const rateImages = getAllByAltText("Rate");
	expect(rateImages.length).toBe(6);

	const nextButton = getByAltText("next-button");

	fireEvent.click(nextButton);
});