import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import {
FaUser,
FaMapMarkerAlt,
FaPhone,
FaVideo,
FaHandPaper
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {

const navigate = useNavigate();
const [user,setUser] = useState(null);
const token = localStorage.getItem("token");

const fetchUserProfile = useCallback(async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/users/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setUser(res.data);

}catch(err){
console.log(err);
}

},[token]);

useEffect(()=>{
fetchUserProfile();
},[fetchUserProfile]);

const sendSOS = async ()=>{

try{

await axios.post(
"http://localhost:5000/api/alerts/sos",
{},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

Swal.fire({
icon:"success",
title:"SOS Alert Sent 🚨",
text:"Authorities have been notified"
});

}catch(err){

Swal.fire({
icon:"error",
title:"SOS Failed",
text:"Unable to send alert"
});

}

};

return(

<>

<style>{`

.dashboard{
padding:20px;
color:white;
}

/* PROFILE */

.profile-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(10px);
border:none;
border-radius:20px;
padding:20px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
margin-bottom:25px;
}

/* SOS BUTTON */

.sos-wrapper{
display:flex;
justify-content:center;
align-items:center;
margin:30px 0;
}

.sos-btn{
width:140px;
height:140px;
border-radius:50%;
background:radial-gradient(circle,#ff4d4d,#990000);
border:none;
color:white;
font-size:24px;
font-weight:bold;
box-shadow:0 0 25px rgba(255,0,0,0.6);
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.08)}
100%{transform:scale(1)}
}

/* ACTION CARDS */

.action-card{
background:rgba(255,255,255,0.08);
border:none;
border-radius:20px;
padding:25px;
text-align:center;
color:white;
cursor:pointer;
transition:0.3s;
}

.action-card:hover{
transform:translateY(-8px);
box-shadow:0 10px 30px rgba(0,0,0,0.5);
}

/* ICON */

.card-icon{
font-size:30px;
margin-bottom:10px;
}

/* MOBILE */

@media(max-width:768px){

.sos-btn{
width:110px;
height:110px;
font-size:18px;
}

}

`}</style>

<div className="dashboard">

<Container>

{/* USER PROFILE */}

<Card className="profile-card">

<h4><FaUser/> User Profile</h4>

{user ? (

<div>

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>
<p><b>Phone:</b> {user.phone}</p>

</div>

) : (

<p>Loading user profile...</p>

)}

</Card>

{/* SOS BUTTON */}

<div className="sos-wrapper">

<motion.button
className="sos-btn"
whileTap={{scale:0.9}}
onClick={sendSOS}
>

SOS

</motion.button>

</div>

{/* ACTION PANELS */}

<Row>

<Col md={3} sm={6} className="mb-4">

<motion.div whileHover={{scale:1.05}}>

<Card
className="action-card"
onClick={()=>navigate("/user-dashboard/gesture-sos")}
>

<div className="card-icon">
<FaHandPaper/>
</div>

<h6>Gesture SOS</h6>

</Card>

</motion.div>

</Col>

<Col md={3} sm={6} className="mb-4">

<motion.div whileHover={{scale:1.05}}>

<Card
className="action-card"
onClick={()=>navigate("/user-dashboard/live-tracking")}
>

<div className="card-icon">
<FaMapMarkerAlt/>
</div>

<h6>Live Tracking</h6>

</Card>

</motion.div>

</Col>

<Col md={3} sm={6} className="mb-4">

<motion.div whileHover={{scale:1.05}}>

<Card
className="action-card"
onClick={()=>navigate("/user-dashboard/emergency-contact")}
>

<div className="card-icon">
<FaPhone/>
</div>

<h6>Emergency Contacts</h6>

</Card>

</motion.div>

</Col>

<Col md={3} sm={6} className="mb-4">

<motion.div whileHover={{scale:1.05}}>

<Card
className="action-card"
onClick={()=>navigate("/user-dashboard/evidence-upload")}
>

<div className="card-icon">
<FaVideo/>
</div>

<h6>Evidence Upload</h6>

</Card>

</motion.div>

</Col>

</Row>

</Container>

</div>

</>

);

};

export default UserDashboard;
