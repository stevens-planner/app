import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import "../assets/login.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  document.body.style.backgroundColor = "#2148C0";

  return (
    <div className="body">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">
            <span id="title">STEVENS </span>STUDY
          </h2>
          <h1 className="text-center2">PLANNER</h1>
          {error && <Alert variant="danger">{error}</Alert>}
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
            <Form.Group id="password">
              <Form.Control
                className="form-input-password"
                type="password"
                placeholder="Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link className="links" to="/forgot-password">
              Forgot Password?
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
    </div>
  );
}
