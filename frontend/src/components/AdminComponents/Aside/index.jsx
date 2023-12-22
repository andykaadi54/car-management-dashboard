import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import rectangle from "../../../assets/Rectangle.png";
import truck from "../../../assets/fi_truck.png";
import home from "../../../assets/fi_home.png";

const Aside = () => {
  const sidebarStyle = {
    width: "130px",
    position: "fixed",
    height: "100%",
    backgroundColor: "#0D28A6",
    top: 0,
    left: 0,
  };

  const SidebarLink = ({ href, imageSrc, altText, label }) => (
    <Nav.Link
      href={href}
      className="d-flex flex-column justify-content-center align-items-center g-1"
    >
      <img src={imageSrc} alt={altText} style={{ marginBottom: "5px" }} />
      <p style={{ color: "#FFF", marginTop: "5px" }}>{label}</p>
    </Nav.Link>
  );

  SidebarLink.propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    altText: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  return (
    <Nav className="col-md-2 d-none d-md-block" style={sidebarStyle}>
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
