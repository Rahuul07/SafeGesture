import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#ff4d4f", "#22c55e"];

const PoliceDashboard = () => {

const navigate = useNavigate();

const [alerts,setAlerts] = useState([]);
const [hiddenAlerts,setHiddenAlerts] = useState([]);

const token = localStorage.getItem("token");

/* FETCH ALL ALERTS */

const fetchAlerts = async () => {
try{

const res = await axios.get(
"http://localhost:5000/api/alerts/all",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setAlerts(res.data);

}catch(err){
console.log(err);
}
};

useEffect(()=>{
fetchAlerts();

const interval = setInterval(fetchAlerts,5000);
return ()=>clearInterval(interval);

},[]);


/* FILTER LAST 2 DAYS */

const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const recentAlerts = alerts
.filter(alert => new Date(alert.createdAt) >= twoDaysAgo)
.filter(alert => !hiddenAlerts.includes(alert._id));


/* COUNTS */

const totalAlerts = alerts.length;
const activeAlerts = alerts.filter(a => a.status === "ACTIVE").length;
const resolvedAlerts = alerts.filter(a => a.status === "RESOLVED").length;


/* TIME STATS */

const now = new Date();

const today = alerts.filter(a =>
new Date(a.createdAt).toDateString() === now.toDateString()
).length;

const week = alerts.filter(a =>
(now - new Date(a.createdAt)) <= 7*24*60*60*1000
).length;

const month = alerts.filter(a =>
(now - new Date(a.createdAt)) <= 30*24*60*60*1000
).length;

const year = alerts.filter(a =>
new Date(a.createdAt).getFullYear() === now.getFullYear()
).length;


/* CHART DATA */

const pieData = [
{ name:"Active", value:activeAlerts },
{ name:"Resolved", value:resolvedAlerts }
];

const barData = [
{ name:"Today", alerts:today },
{ name:"Week", alerts:week },
{ name:"Month", alerts:month },
{ name:"Year", alerts:year }
];


/* REMOVE UI ONLY */

const removeFromRecent = (id) => {
setHiddenAlerts(prev => [...prev, id]);
};


return(

<>

<style>{`

.dashboard{
min-height:100vh;
background:linear-gradient(135deg,#0f172a,#1e293b);
padding:20px;
color:white;
}

.stat-card{
border:none;
border-radius:15px;
padding:20px;
text-align:center;
color:white;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
cursor:pointer;
transition:0.3s;
}

.stat-card:hover{
transform:scale(1.05);
}

.total{background:#2563eb;}
.active{background:#f59e0b;}
.resolved{background:#22c55e;}

.chart-card{
background:white;
border-radius:15px;
padding:20px;
color:black;
box-shadow:0 10px 30px rgba(0,0,0,0.2);
}

.table-box{
margin-top:30px;
background:white;
border-radius:15px;
padding:15px;
color:black;
}

.delete-btn{
background:red;
border:none;
}

.delete-btn:hover{
background:darkred;
}

.delete-btn:disabled{
background:gray;
cursor:not-allowed;
}

`}</style>


<div className="dashboard">

<Container fluid>

{/* STATS */}

<Row>

<Col md={4}>
<motion.div whileHover={{scale:1.05}}>
<Card 
className="stat-card total"
onClick={() => navigate("/police/total-alerts")}   // ✅ TOTAL CLICK
>
<h5>Total Alerts</h5>
<h2>{totalAlerts}</h2>
</Card>
</motion.div>
</Col>

<Col md={4}>
<motion.div whileHover={{scale:1.05}}>
<Card 
className="stat-card active"
onClick={() => navigate("/police/active-alerts")}  // ✅ ACTIVE CLICK
>
<h5>Active Alerts</h5>
<h2>{activeAlerts}</h2>
</Card>
</motion.div>
</Col>

<Col md={4}>
<motion.div whileHover={{scale:1.05}}>
<Card className="stat-card resolved"
onClick={() => navigate("/police/resolved-alerts")} // ✅ RESOLVED CLICK
> 
<h5>Resolved Alerts</h5>
<h2>{resolvedAlerts}</h2>
</Card>
</motion.div>
</Col>

</Row>


{/* CHARTS */}

<Row className="mt-4">

<Col md={6}>
<Card className="chart-card">
<h5 style={{textAlign:"center"}}>Alert Distribution</h5>

<ResponsiveContainer width="100%" height={250}>
<PieChart>
<Pie data={pieData} dataKey="value" outerRadius={80}>
{pieData.map((entry, index) => (
<Cell key={index} fill={COLORS[index]} />
))}
</Pie>
<Tooltip />
</PieChart>
</ResponsiveContainer>

</Card>
</Col>

<Col md={6}>
<Card className="chart-card">
<h5 style={{textAlign:"center"}}>Alerts Timeline</h5>

<ResponsiveContainer width="100%" height={250}>
<BarChart data={barData}>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Bar dataKey="alerts" fill="#6366f1" />
</BarChart>
</ResponsiveContainer>

</Card>
</Col>

</Row>


{/* TABLE */}

<div className="table-box">

<h4>Recent Alerts 🚨(Last 2 Days)</h4>

<Table striped bordered hover responsive>

<thead>
<tr>
<th>User</th>
<th>Location</th>
<th>Status</th>
<th>Time</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{recentAlerts.map((alert)=>(
<tr key={alert._id}>

<td>{alert.userId?.name || "User"}</td>

<td>
📍 {alert.locationName || `${alert.location?.latitude}, ${alert.location?.longitude}`}
</td>

<td style={{color: alert.status === "ACTIVE" ? "red" : "green"}}>
{alert.status === "ACTIVE" ? "🔴 Pending" : "🟢 Resolved"}
</td>

<td>
{new Date(alert.createdAt).toLocaleString()}
</td>

<td>
<Button
className="delete-btn"
size="sm"
disabled={alert.status !== "RESOLVED"}
onClick={()=>removeFromRecent(alert._id)}
>
Remove
</Button>
</td>

</tr>
))}

</tbody>

</Table>

</div>

</Container>

</div>

</>

);

};

export default PoliceDashboard;