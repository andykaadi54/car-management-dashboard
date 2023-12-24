import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/"; 
import Faq from "..";

describe("Faq Component", () => {
	test("renders Faq component correctly", () => {
		render(<Faq />);
    
		const faqSection = screen.getByTestId("faq");
		expect(faqSection).toBeInTheDocument();
    
		const accordionButtons = screen.getAllByRole("button");
		expect(accordionButtons).toHaveLength(5);
	});

	test("accordion functionality works as expected", () => {
		render(<Faq />);
    
		const firstAccordionButton = screen.getByText("Apa saja syarat yang dibutuhkan?");
		fireEvent.click(firstAccordionButton);

		const firstAccordionContent = screen.getByTestId("flush-collapseOne");
		expect(firstAccordionContent).toBeVisible();

	});
});