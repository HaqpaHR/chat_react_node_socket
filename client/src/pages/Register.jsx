import React, { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";

const Register = () => {
  const { registerInfo, updateRegisterInfo } = useContext(AuthContext);
  return (
    <>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Registration</h2>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(event) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    name: event.target.value,
                  })
                }
              />
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(event) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    email: event.target.value,
                  })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: event.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                Registration
              </Button>
              <Alert variant="danger">
                <p>an error occurred</p>
              </Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
