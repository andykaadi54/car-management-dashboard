import React from "react";
import FilterSearch from "../../components/FilterSearch";
import Footer from "../../components/Footer";
import MainSection from "../../components/MainSection";

const SearchPage: React.FC = () => {
	return (
		<>
			<MainSection />
			<FilterSearch />
			<Footer />
		</>
	);
};
export default SearchPage;
