import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";

const PoliceDashboard = () => {

const [alerts,setAlerts] = useState([]);
const [hiddenAlerts,setHiddenAlerts] = useState([]);

const token = localStorage.getItem("token");

/* FETCH ALL ALERTS */

const fetchAlerts = async () => {
try{

const res = await axios.get(
"http://localhost:5000/api/alerts/all", // ✅ FIXED
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

/* AUTO REFRESH EVERY 5 SEC */
const interval = setInterval(fetchAlerts,5000);

return ()=>clearInterval(interval);

},[]);


/* FILTER LAST 2 DAYS FOR TABLE */

const twoDaysAgo = new Date();
twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

const recentAlerts = alerts
.filter(alert => new Date(alert.createdAt) >= twoDaysAgo)
.filter(alert => !hiddenAlerts.includes(alert._id));


/* COUNTS FROM FULL DATA (IMPORTANT) */

const totalAlerts = alerts.length;

const activeAlerts = alerts.filter(a => a.status === "ACTIVE").length;

const resolvedAlerts = alerts.filter(a => a.status === "RESOLVED").length;


/* REMOVE ONLY FROM UI */

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
}

.total{background:#2563eb;}
.active{background:#f59e0b;}
.resolved{background:#22c55e;}

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
<Card className="stat-card total">
<h5>Total Alerts</h5>
<h2>{totalAlerts}</h2>
</Card>
</motion.div>
</Col>

<Col md={4}>
<motion.div whileHover={{scale:1.05}}>
<Card className="stat-card active">
<h5>Active Alerts</h5>
<h2>{activeAlerts}</h2>
</Card>
</motion.div>
</Col>

<Col md={4}>
<motion.div whileHover={{scale:1.05}}>
<Card className="stat-card resolved">
<h5>Resolved Alerts</h5>
<h2>{resolvedAlerts}</h2>
</Card>
</motion.div>
</Col>

</Row>


{/* TABLE */}

<div className="table-box">

<h4>Recent Alerts (Last 2 Days)</h4>

<Table striped bordered hover responsive>

<thead>
<tr>
<th>User</th>
<th>Latitude</th>
<th>Longitude</th>
<th>Status</th>
<th>Time</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{recentAlerts.map((alert)=>(
<tr key={alert._id}>

<td>{alert.userId?.name || "User"}</td>

<td>{alert.location?.latitude}</td>

<td>{alert.location?.longitude}</td>

<td>
<span style={{
color: alert.status === "ACTIVE" ? "red" : "green"
}}>
{alert.status}
</span>
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