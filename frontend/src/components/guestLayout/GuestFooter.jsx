import React from "react";
import { Container } from "react-bootstrap";

const GuestFooter1 = () => {
  return (
    <div
      style={{
        background: "#212529",
        color: "white",
        padding: "20px",
        marginTop: "60px"
      }}
    >
      <Container className="text-center">

        <h5>SafeGesture AI</h5>

        <p>
          AI Powered Women Safety System using Gesture Detection
        </p>

        <p style={{ fontSize: "14px", opacity: "0.8" }}>
          © {new Date().getFullYear()} SafeGesture | All Rights Reserved
        </p>

      </Container>
    </div>
  );
};

export default GuestFooter1;