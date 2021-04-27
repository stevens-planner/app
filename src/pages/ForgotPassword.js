import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../assets/login.css";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  document.body.style.backgroundColor = "#2148C0"

  return (
    <>
      <Card className="body">
        <Card.Body>
          <h2 className="text-center mb-4"><span id="password">PASSWORD</span></h2>
          <h2 id="reset">RESET</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Control
                className="form-input"
                type="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="links" to="/login">
              Login
            </Link>
          </div>
        </Card.Body>
      
      <div className="w-100 text-center mt-2">
        Need an account?{" "}
        <Link className="links" to="/signup">
          Sign Up
        </Link>
      </div>
      </Card>
    </>
  );
}
