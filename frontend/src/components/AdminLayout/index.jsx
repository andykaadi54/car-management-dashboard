import { Container, Row, Col } from "react-bootstrap";
import Aside from "../../components/AdminComponents/Aside";
import Header from "../../components/AdminComponents/Header/";
import PropTypes from "prop-types";

const AdminLayout = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Aside />
        </Col>
        <Col md={11}>
          <Header />
          {children}
        </Col>
      </Row>
    </Container>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
