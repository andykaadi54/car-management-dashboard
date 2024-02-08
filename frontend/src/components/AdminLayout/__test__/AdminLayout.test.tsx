import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/"; 

import AdminLayout from "..";
import { AuthProvider } from "../../../context/AuthContext";

describe("AdminLayout Component", () => {
	it("renders AdminLayout component correctly", async () => {
		render(
			<AuthProvider>
				<AdminLayout>
					<div>Content</div>
				</AdminLayout>
			</AuthProvider>
		);

		await waitFor(() => {
			expect(screen.getByText("Content")).toBeInTheDocument();
			expect(screen.getByTestId("container-fluid")).toBeInTheDocument();
			expect(screen.getByTestId("row")).toBeInTheDocument();
			expect(screen.getByTestId("aside-component")).toBeInTheDocument(); 
			expect(screen.getByTestId("header-component")).toBeInTheDocument(); 
		});
	});
});