import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

const MyAlerts = () => {

const [alerts, setAlerts] = useState([]);
const [loading, setLoading] = useState(true);

const fetchAlerts = async () => {
try {

  const token = localStorage.getItem("token");

  const res = await axios.get(
    "http://localhost:5000/api/alerts/my-alerts",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  setAlerts(res.data);

} catch (error) {
  console.log("Error fetching alerts:", error);
} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchAlerts();
}, []);

return (
<div style={{
minHeight: "100vh",
background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
padding: "40px 20px",
color: "white"
}}>

  <Container>

    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", marginBottom: "35px", fontWeight: "bold" }}
    >
      🚨 My Alert History
    </motion.h2>

    {loading ? (
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Spinner animation="border" variant="light" />
      </div>
    ) : alerts.length === 0 ? (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ textAlign: "center", marginTop: "60px" }}
      >
        <h5>No alerts found</h5>
      </motion.div>
    ) : (
      <Row>
        {alerts.map((alert, index) => {

          const isActive = alert.status === "ACTIVE";

          return (
            <Col md={6} lg={4} key={alert._id} className="mb-4">

              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >

                <Card style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  borderRadius: "20px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  padding: "15px",
                  boxShadow: isActive
                    ? "0 0 20px rgba(255,0,0,0.4)"
                    : "0 0 20px rgba(0,255,150,0.3)",
                  transition: "0.3s"
                }}>

                  <Card.Body>

                    {/* LOCATION */}
                    <h6 style={{ fontWeight: "bold", marginBottom: "10px" }}>
                      📍 {alert.locationName || "Unknown Location"}
                    </h6>

                    {/* TIME */}
                    <p style={{ fontSize: "13px", color: "#ddd" }}>
                      🕒 {new Date(alert.createdAt).toLocaleString()}
                    </p>

                    {/* STATUS */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge
                        bg={isActive ? "danger" : "success"}
                        style={{
                          padding: "10px 14px",
                          fontSize: "13px",
                          borderRadius: "20px",
                          marginTop: "10px"
                        }}
                      >
                        {isActive ? "🔴 Pending" : "🟢 Resolved"}
                      </Badge>
                    </motion.div>

                  </Card.Body>

                </Card>

              </motion.div>

            </Col>
          );
        })}
      </Row>
    )}

  </Container>

</div>

);
};

export default MyAlerts;