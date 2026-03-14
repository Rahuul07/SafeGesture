import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
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

useEffect(()=>{
fetchUserProfile();
},[]);


const fetchUserProfile = async ()=>{

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

}catch(error){
console.log(error);
}

};


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

/* PROFILE CARD */

.profile-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(10px);
border:none;
border-radius:20px;
padding:20px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
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

/* SOS BUTTON */

.sos-btn{
width:120px;
height:120px;
border-radius:50%;
background:radial-gradient(circle,#ff4d4d,#b30000);
border:none;
color:white;
font-size:22px;
font-weight:bold;
margin-top:15px;
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{transform:scale(1);}
50%{transform:scale(1.08);}
100%{transform:scale(1);}
}

/* MOBILE */

@media(max-width:768px){

.sos-btn{
width:100px;
height:100px;
font-size:18px;
}

}

`}</style>


<div className="dashboard">

<Container>

{/* PROFILE */}

<Row className="mb-4">

<Col md={12}>

<Card className="profile-card">

<h4><FaUser/> User Profile</h4>

{user && (

<div>

<p><b>Name:</b> {user.name}</p>
<p><b>Email:</b> {user.email}</p>
<p><b>Phone:</b> {user.phone}</p>

</div>

)}

</Card>

</Col>

</Row>


{/* SOS BUTTON */}

<Row className="mb-5 text-center">

<Col>

<motion.button
className="sos-btn"
whileTap={{scale:0.9}}
onClick={sendSOS}
>

SOS

</motion.button>

</Col>

</Row>


{/* QUICK ACTIONS */}

<Row>

<Col md={3} sm={6} className="mb-4">

<motion.div
whileHover={{scale:1.05}}
>

<Card
className="action-card"
onClick={()=>navigate("/gesture-sos")}
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
onClick={()=>navigate("/live-tracking")}
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
onClick={()=>navigate("/emergency-contact")}
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
onClick={()=>navigate("/evidence-upload")}
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