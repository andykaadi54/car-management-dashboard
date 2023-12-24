import React, { ReactNode } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Aside from "../AdminComponents/Aside";
import Header from "../AdminComponents/Header";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => (
	<Container fluid data-testid="container-fluid">
		<Row data-testid="row">
			<Col>
				<Aside data-testid="aside-component"/>
			</Col>
			<Col md={11}>
				<Header data-testid="header-component" />
				{children}
			</Col>
		</Row>
	</Container>
);

export default AdminLayout;
