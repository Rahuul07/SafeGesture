import React, { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";

const ResolvedAlerts = () => {

  const [alerts, setAlerts] = useState([]);

  const token = localStorage.getItem("token");

  // ===============================
  // FETCH ALERTS
  // ===============================
  const fetchAlerts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/alerts/all",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // ✅ FILTER ONLY RESOLVED
      const resolved = res.data.filter(a => a.status === "RESOLVED");

      setAlerts(resolved);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      padding: "20px",
      color: "white"
    }}>

      <Container>

        {/* HEADER */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          🟢 Resolved Alerts
        </motion.h3>

        {/* TABLE */}
        <Card style={{
          padding: "20px",
          borderRadius: "15px",
          color: "black"
        }}>

          <Table striped bordered hover responsive>

            <thead>
              <tr>
                <th>User</th>
                <th>Location</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>

              {alerts.map((alert, index) => (

                <motion.tr
                  key={alert._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                >

                  <td>{alert.userId?.name || "User"}</td>

                  <td>
                    📍 {alert.locationName || `${alert.location?.latitude}, ${alert.location?.longitude}`}
                  </td>

                  <td style={{ color: "green" }}>
                    🟢 Resolved
                  </td>

                  <td>
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>

                </motion.tr>

              ))}

            </tbody>

          </Table>

        </Card>

      </Container>

    </div>
  );
};

export default ResolvedAlerts;