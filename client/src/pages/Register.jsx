import React, { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext.jsx";

const Register = () => {
  const { registerInfo, updateRegisterInfo, registrationUser, registrationError, isLoading } = useContext(AuthContext);
  return (
    <>
      <Form onSubmit={registrationUser}>
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
                  {isLoading ? 'Creating your account' : "Registration"}
              </Button>
                {registrationError?.error &&
                    <Alert variant="danger">
                        <p>{registrationError.message}</p>
                    </Alert>
                }
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
