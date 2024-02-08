import { render} from "@testing-library/react";
import "@testing-library/jest-dom/";
import Header from "..";

jest.mock("../../../../context/AuthContext", () => ({
	useAuth: jest.fn(() => ({ user: { id: 1, name: "TestUser", email: "test@example.com", role: "user" } })),
}));

describe("Header Component", () => {
	it("renders without crashing", () => {
		render(<Header />);
	});

	it("renders the user link with the correct username", () => {
		const { getByText } = render(<Header />);
		const usernameElement = getByText("TestUser");
		expect(usernameElement).toBeInTheDocument();
	});
});