import { Button, Col, Container, Form, Row } from "react-bootstrap";
import bgCar from "../../assets/bg-car.png";
import rectangle from "../../assets/Rectangle-2.png";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/admin/cars");
    } catch (error) {
      setIsFailed(true);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            md={8}
            style={{
              padding: 0,
              overflow: "hidden",
              height: "100vh",
            }}
          >
            <img
              src={bgCar}
              alt="gambar-mobil"
              style={{ background: "lightgray 50% / cover no-repeat" }}
            />
          </Col>

          <Col>
            <div style={{ margin: "150px 40px" }}>
              <img src={rectangle} alt="rectangle" className="mb-4" />
              <h1
                style={{ fontSize: "24px", fontWeight: "700" }}
                className="mb-4"
              >
                Welcome, Admin BCR
              </h1>

              {isFailed && (
                <div
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "5px",
                    background: "rgba(208, 12, 26, 0.10)",
                  }}
                  className="mb-4"
                >
                  <span
                    style={{
                      color: "#D00C1A",
                    }}
                  >
                    Masukkan username dan password yang benar. Perhatikan
                    penggunaan huruf kapital.
                  </span>
                </div>
              )}
              <Form onSubmit={handleLogin}>
                <Form.Group
                  as={Row}
                  className="mb-4"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label sm="2">Email</Form.Label>
                  <Col sm="12">
                    <Form.Control
                      type="text"
                      placeholder="Contoh: johndee@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-5"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label sm="2">Password</Form.Label>
                  <Col sm="12">
                    <Form.Control
                      type="password"
                      placeholder="6+ karakter"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Col sm="12">
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ width: "100%" }}
                  >
                    Sign In
                  </Button>
                </Col>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Login;
