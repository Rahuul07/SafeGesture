import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { motion } from "framer-motion";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ActiveAlerts = () => {

const [alerts,setAlerts] = useState([]);
const token = localStorage.getItem("token");

/* ===============================
FETCH ALERTS
=============================== */

const fetchAlerts = async () => {
try{

const res = await axios.get(
"http://localhost:5000/api/alerts/active",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setAlerts(res.data);

}catch(err){
console.log(err);
}
};

/* ===============================
RESOLVE ALERT
=============================== */

const resolveAlert = async (id)=>{
try{

await axios.put(
`http://localhost:5000/api/alerts/resolve/${id}`,
{},
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setAlerts(prev =>
prev.map(a =>
a._id === id ? { ...a, status:"RESOLVED" } : a
)
);

}catch(err){
console.log(err);
}
};

/* ===============================
SOCKET REALTIME
=============================== */

useEffect(()=>{

fetchAlerts();

socket.on("newAlert",(alert)=>{
setAlerts(prev => [alert,...prev]);
});

socket.on("alertResolved",(data)=>{
setAlerts(prev =>
prev.map(a =>
a._id === data._id ? { ...a, status:"RESOLVED" } : a
)
);
});

socket.on("userLocationUpdate",(data)=>{
setAlerts(prev =>
prev.map(a =>
a.userId === data.userId
? {
...a,
location:{
latitude:data.latitude,
longitude:data.longitude
}
}
: a
)
);
});

return ()=>{
socket.off("newAlert");
socket.off("alertResolved");
socket.off("userLocationUpdate");
};

},[]);


/* ===============================
UI
=============================== */

return(
<>

<style>{`

.page{
min-height:100vh;
background:linear-gradient(135deg,#0f172a,#1e293b);
padding:20px;
color:white;
}

/* CARD */

.alert-card{
background:#ffffff;
border-radius:15px;
padding:15px;
margin-bottom:20px;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
color:black;
}

/* VIDEO */

.video-box{
width:100%;
height:180px;
border-radius:10px;
overflow:hidden;
background:black;
}

video{
width:100%;
height:100%;
object-fit:cover;
}

/* STATUS */

.status-active{
color:red;
font-weight:bold;
}

.status-resolved{
color:green;
font-weight:bold;
}

/* BUTTON */

.resolve-btn{
margin-top:10px;
background:#22c55e;
border:none;
}

.resolve-btn:hover{
transform:scale(1.05);
}

`}</style>


<div className="page">

<Container>

<h3>🚨 Active Alerts</h3>

{alerts.length === 0 && <p>No alerts</p>}

{alerts.map((alert)=>{

const videoUrl = alert.evidence
? `http://localhost:5000/${alert.evidence.videoUrl}`
: null;

return(

<motion.div
key={alert._id}
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:0.5}}
>

<Card className="alert-card">

<Row>

{/* LEFT DETAILS */}
<Col md={6}>

<h5>👤 {alert.userId?.name || "User"}</h5>

<p>📞 {alert.userId?.phone}</p>

<p>📍 {alert.locationName || "Unknown Location"}</p>

<p>
Status:{" "}
<span className={
alert.status === "ACTIVE"
? "status-active"
: "status-resolved"
}>
{alert.status}
</span>
</p>

{alert.status === "ACTIVE" && (
<Button
className="resolve-btn"
onClick={()=>resolveAlert(alert._id)}
>
Resolve
</Button>
)}

</Col>


{/* RIGHT VIDEO */}
<Col md={6}>

<div className="video-box">

{videoUrl ? (
<video controls>
<source src={videoUrl} type="video/webm" />
</video>
) : (
<p style={{color:"white",textAlign:"center",marginTop:"70px"}}>
No Evidence
</p>
)}

</div>

</Col>

</Row>

</Card>

</motion.div>

);

})}

</Container>

</div>

</>

);

};

export default ActiveAlerts;