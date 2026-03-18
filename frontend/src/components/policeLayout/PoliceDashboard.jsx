import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from "socket.io-client";
import { motion } from "framer-motion";

const socket = io("http://localhost:5000");

const PoliceDashboard = () => {

const [alerts,setAlerts] = useState([]);
const [selectedAlert,setSelectedAlert] = useState(null);

const token = localStorage.getItem("token");

/* FETCH ALERTS */

const fetchAlerts = async ()=>{
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


/* SOCKET LISTENER */

useEffect(()=>{

fetchAlerts();

/* NEW ALERT */
socket.on("newAlert",(alert)=>{
setAlerts(prev => [alert,...prev]);
});

/* ALERT RESOLVED */
socket.on("alertResolved",(updated)=>{
setAlerts(prev =>
prev.filter(a => a._id !== updated._id)
);
});

/* CLEANUP */
return ()=>{
socket.off("newAlert");
socket.off("alertResolved");
};

},[]);


/* RESOLVE ALERT */

const resolveAlert = async(id)=>{

try{

await axios.put(
`http://localhost:5000/api/alerts/resolve/${id}`,
{},
{
headers:{ Authorization:`Bearer ${token}` }
}
);

}catch(err){
console.log(err);
}

};


return(

<>

<style>{`

.dashboard{
min-height:100vh;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
padding:20px;
color:white;
}

.card-alert{
border:none;
border-radius:15px;
padding:15px;
background:white;
color:black;
box-shadow:0 10px 30px rgba(0,0,0,0.2);
margin-bottom:15px;
}

.map-box{
height:500px;
border-radius:15px;
overflow:hidden;
}

.video-box{
margin-top:10px;
}

video{
width:100%;
border-radius:10px;
}

.resolve-btn{
background:red;
border:none;
}

.resolve-btn:hover{
background:darkred;
}

`}</style>


<div className="dashboard">

<Container fluid>

<Row>

{/* LEFT SIDE ALERT LIST */}

<Col md={4}>

<h4>🚨 Active Alerts</h4>

{alerts.length === 0 && <p>No active alerts</p>}

{alerts.map(alert => (

<motion.div
key={alert._id}
whileHover={{scale:1.03}}
>

<Card className="card-alert">

<h6>User ID: {alert.userId}</h6>

<p>
📍 Lat: {alert.location?.latitude}<br/>
📍 Lng: {alert.location?.longitude}
</p>

<Button
variant="danger"
className="resolve-btn"
onClick={()=>resolveAlert(alert._id)}
>
Resolve
</Button>

<Button
variant="dark"
className="mt-2"
onClick={()=>setSelectedAlert(alert)}
>
View
</Button>

</Card>

</motion.div>

))}

</Col>


{/* RIGHT SIDE MAP + DETAILS */}

<Col md={8}>

<h4>📍 Live Map</h4>

<div className="map-box">

<MapContainer
center={[20.5937,78.9629]}
zoom={5}
style={{height:"100%",width:"100%"}}
>

<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

{alerts.map(alert => (

<Marker
key={alert._id}
position={[
alert.location?.latitude,
alert.location?.longitude
]}
>
<Popup>
SOS Alert 🚨
</Popup>
</Marker>

))}

</MapContainer>

</div>


{/* SELECTED ALERT DETAILS */}

{selectedAlert && (

<div className="mt-4">

<h5>📄 Alert Details</h5>

<p>
User: {selectedAlert.userId}<br/>
Lat: {selectedAlert.location?.latitude}<br/>
Lng: {selectedAlert.location?.longitude}
</p>

{/* VIDEO */}
<div className="video-box">

<video controls>
<source
src={`http://localhost:5000/${selectedAlert.videoUrl}`}
type="video/webm"
/>
</video>

</div>

</div>

)}

</Col>

</Row>

</Container>

</div>

</>

);

};

export default PoliceDashboard;