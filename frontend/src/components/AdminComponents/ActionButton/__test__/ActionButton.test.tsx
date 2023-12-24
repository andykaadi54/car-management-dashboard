import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/"; 

import ActionButton from "..";

describe("ActionButton component", () => {
	test("renders with correct styles and text", () => {
		const { getByText } = render(
			<ActionButton variant="success" icon={<span>Icon</span>} text="Edit" />
		);

		const button = getByText("Edit");

		expect(button).toHaveStyle("background-color: green");
		expect(button).toHaveStyle("color: white");
		expect(button).toHaveTextContent("Edit");
	});

	test("calls onClick when clicked", async () => {
		const onClickMock = jest.fn();
		const { getByText } = render(
			<ActionButton
				variant="success"
				icon={<span>Icon</span>}
				text="Edit"
				onClick={onClickMock}
			/>
		);

		const button = getByText("Edit");
		await userEvent.click(button);
        
		expect(onClickMock).toHaveBeenCalled();
	});

	test("renders outline-danger style correctly", () => {
		const { getByText } = render(
			<ActionButton
				variant="outline-danger"
				icon={<span>Icon</span>}
				text="Delete"
			/>
		);

		const button = getByText("Delete");

		expect(button).toHaveStyle("border: 1px solid red");
	});
});