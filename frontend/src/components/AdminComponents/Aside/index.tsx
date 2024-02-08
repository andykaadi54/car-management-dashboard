import React from "react";
import { Nav } from "react-bootstrap";
import rectangle from "../../../assets/Rectangle.png";
import truck from "../../../assets/fi_truck.png";
import home from "../../../assets/fi_home.png";

interface SidebarLinkProps {
  href: string;
  imageSrc: string;
  altText: string;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
	href,
	imageSrc,
	altText,
	label,
}) => (
	<Nav.Link
		href={href}
		className="d-flex flex-column justify-content-center align-items-center g-1"
	>
		<img src={imageSrc} alt={altText} style={{ marginBottom: "5px" }} />
		<p style={{ color: "#FFF", marginTop: "5px" }}>{label}</p>
	</Nav.Link>
);

const Aside: React.FC = () => {
	const sidebarStyle: React.CSSProperties = {
		width: "130px",
		position: "fixed",
		height: "100%",
		backgroundColor: "#0D28A6",
		top: 0,
		left: 0,
	};

	return (
		<Nav className="col-md-2 d-none d-md-block" style={sidebarStyle} data-testid="aside-component">
			<div className="sidebar-sticky">
				<Nav.Item className="d-flex justify-content-center align-items-center">
					<Nav.Link href="#" className="mb-5">
						<img src={rectangle} alt="rectangle" />
					</Nav.Link>
				</Nav.Item>

				<SidebarLink
					href="#"
					imageSrc={home}
					altText="dashboard"
					label="Dashboard"
				/>
				<SidebarLink
					href="#"
					imageSrc={truck}
					altText="dashboard"
					label="Cars"
				/>
			</div>
		</Nav>
	);
};

export default Aside;
