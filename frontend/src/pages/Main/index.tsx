import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SearchPage from "./SearchPage";

const Main: React.FC = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/search" element={<SearchPage />} />
			</Routes>
		</>
	);
};
export default Main;
