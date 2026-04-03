import React, { useEffect, useState } from "react";
import { Container, Table, Card, Button } from "react-bootstrap";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const TotalAlerts = () => {

  const [alerts, setAlerts] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("ALL");

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
      setAlerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // ===============================
  // FILTER + SEARCH LOGIC
  // ===============================
  const filteredAlerts = alerts
    .filter((alert) => {
      if (filter === "ACTIVE") return alert.status === "ACTIVE";
      if (filter === "RESOLVED") return alert.status === "RESOLVED";
      return true;
    })
    .filter((alert) =>
      alert.userId?.name?.toLowerCase().includes(searchText.toLowerCase())
    );

  // ===============================
  // EXPORT PDF
  // ===============================
  const exportPDF = () => {

  const doc = new jsPDF();

  // ===============================
  // HEADER
  // ===============================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(30, 41, 59);
  doc.text("SafeGesture Alerts Report", 14, 15);

  doc.setDrawColor(30, 41, 59);
  doc.line(14, 18, 196, 18);

  // DATE
  doc.setFontSize(10);
  doc.setTextColor(100);
  const formattedDate = new Date().toLocaleString("en-IN", {
  day: "2-digit",
  month: "long",   // ✅ MONTH NAME
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

doc.text(`Generated on: ${formattedDate}`, 14, 25);


 // ===============================
// SUMMARY (HORIZONTAL 🔥)
// ===============================

const total = filteredAlerts.length;
const active = filteredAlerts.filter(a => a.status === "ACTIVE").length;
const resolved = filteredAlerts.filter(a => a.status === "RESOLVED").length;

doc.setFont("helvetica", "medium"); // not bold
doc.setFontSize(11);

// Light gray colors
doc.setTextColor(30, 41, 59); 
doc.text(`Total Alerts: ${total}`, 14, 40);

doc.setTextColor(30, 41, 59); 
doc.text(`Active Alerts: ${active}`, 80, 40);

doc.setTextColor(30, 41, 59); 
doc.text(`Resolved Alerts: ${resolved}`, 150, 40);


  // ===============================
  // TABLE DATA
  // ===============================
  const tableData = filteredAlerts.map((a) => [
    a.userId?.name || "User",
    a.locationName || `${a.location?.latitude}, ${a.location?.longitude}`,
    a.status === "ACTIVE" ? "Pending" : "Resolved",
    new Date(a.createdAt).toLocaleString()
  ]);


  // ===============================
  // TABLE
  // ===============================
  autoTable(doc, {
    startY: 50,
    head: [["User", "Location", "Status", "Time"]],
    body: tableData,

    styles: {
      fontSize: 9,
      cellPadding: 3
    },

    headStyles: {
      fillColor: [30, 41, 59],
      textColor: 255,
      fontStyle: "bold"
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },

    didParseCell: function (data) {
      if (data.column.index === 2) {
        if (data.cell.raw === "Pending") {
          data.cell.styles.textColor = [255, 0, 0];
        }
        if (data.cell.raw === "Resolved") {
          data.cell.styles.textColor = [0, 150, 0];
        }
      }
    }
  });


  // ===============================
  // FOOTER (CENTERED 🔥)
  // ===============================
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(10);
  doc.setTextColor(150);

  doc.text(
    "SafeGesture Emergency System",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );


  // ===============================
  // SAVE
  // ===============================
  doc.save("SafeGesture_Alerts_Report.pdf");
};
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      padding: "20px",
      color: "white"
    }}>

      <Container>

        {/* HEADER */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}>

          <motion.h3
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            📊 Total Alerts
          </motion.h3>

          {/* SEARCH ICON */}
          <FaSearch
            style={{ cursor: "pointer" }}
            onClick={() => setSearchOpen(!searchOpen)}
          />

        </div>

        {/* SEARCH BAR */}
        <AnimatePresence>
          {searchOpen && (
            <motion.input
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              placeholder="Search by user..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "none"
              }}
            />
          )}
        </AnimatePresence>

        {/* FILTER BUTTONS */}
        <div style={{ marginBottom: "15px" }}>
          <Button size="sm" onClick={() => setFilter("ALL")}>All</Button>{" "}
          <Button size="sm" variant="warning" onClick={() => setFilter("ACTIVE")}>Active</Button>{" "}
          <Button size="sm" variant="success" onClick={() => setFilter("RESOLVED")}>Resolved</Button>
        </div>

        {/* TABLE */}
        <Card style={{ padding: "20px", borderRadius: "15px", color: "black" }}>

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

              {filteredAlerts.map((alert, index) => (

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

                  <td style={{
                    color: alert.status === "ACTIVE" ? "red" : "green"
                  }}>
                    {alert.status === "ACTIVE" ? "🔴 Pending" : "🟢 Resolved"}
                  </td>

                  <td>
                    {new Date(alert.createdAt).toLocaleString()}
                  </td>

                </motion.tr>

              ))}

            </tbody>

          </Table>

        </Card>

        {/* EXPORT BUTTON */}
        <div style={{
          position: "fixed",
          bottom: "20px",
          right: "20px"
        }}>
          <Button variant="danger" onClick={exportPDF}>
            Export PDF
          </Button>
        </div>

      </Container>

    </div>
  );
};

export default TotalAlerts;