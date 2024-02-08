import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import PhotoProfile from "../../../assets/foto-profile.png";
import ChevronDown from "../../../assets/fi_chevron-down.png";
import { useAuth } from "../../../context/AuthContext";

const UserLink: React.FC = () => {
	const { user } = useAuth();

	return (
		<Nav.Link
			href="#account"
			className="user-link d-flex align-items-center"
			style={{ marginRight: "50px" }}
		>
			<img
				src={PhotoProfile}
				alt="foto-profile"
				style={{ marginRight: "10px" }}
			/>
			<p style={{ margin: "0", marginRight: "5px" }}>
				{user ? user.name : "Guest"}
			</p>
			<img src={ChevronDown} alt="chevron-down" />
		</Nav.Link>
	);
};

const Header: React.FC = () => (
	<Navbar expand="lg" style={{ backgroundColor: "#fff", marginBottom: "80px" }} data-testid="header-component">
		<Navbar.Toggle aria-controls="basic-navbar-nav" />
		<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
			<Nav className="ms-auto">
				<UserLink />
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

export default Header;
