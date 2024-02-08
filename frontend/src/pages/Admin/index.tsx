import React from "react";
import AdminLayout from "../../components/AdminLayout";
import { Routes, Route } from "react-router-dom";
import ListCars from "./ListCars";
import AddCars from "./AddCars";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EditCars from "./EditCars";

const Admin: React.FC = () => {
	return (
		<AdminLayout>
			<Routes>
				<Route path="/cars" element={<ListCars />} />
				<Route path="/cars/add" element={<AddCars />} />
				<Route path="/cars/edit/:id" element={<EditCars />} />
			</Routes>
			<ToastContainer />
		</AdminLayout>
	);
};
export default Admin;
