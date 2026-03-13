import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
FaMobileAlt,
FaVideo,
FaMapMarkedAlt,
FaBell,
FaUserShield,
FaRobot,
FaShieldAlt
} from "react-icons/fa";

const Services = () => {

const services = [
{
icon:<FaMobileAlt/>,
title:"Gesture SOS Trigger",
desc:"Draw a Z gesture to instantly activate the emergency protection system."
},
{
icon:<FaVideo/>,
title:"Auto Evidence Recording",
desc:"The camera automatically records 15 seconds of video evidence."
},
{
icon:<FaMapMarkedAlt/>,
title:"Live Location Tracking",
desc:"Real time GPS location is shared instantly with authorities."
},
{
icon:<FaBell/>,
title:"Instant Police Alerts",
desc:"Nearby police dashboards receive SOS alerts immediately."
},
{
icon:<FaUserShield/>,
title:"Emergency Contact Alerts",
desc:"Family and trusted contacts receive emergency notifications."
},
{
icon:<FaRobot/>,
title:"AI Gesture Detection",
desc:"Smart AI detects emergency gestures fast and instantly."
}
];

return(
<>

<style>{`

.services-page{
min-height:100vh;
background: linear-gradient(120deg,#0f2027,#203a43,#2c5364);
background-size:300% 300%;
animation:gradientMove 14s ease infinite;
color:white;
padding:100px 0;
display:flex;
flex-direction:column;
}

@keyframes gradientMove{
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}

/* floating bubbles */

.bubble{
position:absolute;
border-radius:50%;
background:rgba(255,255,255,0.08);
animation:float 8s infinite ease-in-out;
}

.b1{width:140px;height:140px;top:10%;left:8%;}
.b2{width:90px;height:90px;bottom:20%;right:12%;}
.b3{width:70px;height:70px;top:45%;right:30%;}

@keyframes float{
0%{transform:translateY(0)}
50%{transform:translateY(-20px)}
100%{transform:translateY(0)}
}

/* SECTION TITLE */

.info-title{
font-size:50px;
font-weight:800;
margin-bottom:20px;
text-align:center;
}

.info-text{
font-size:19px;
opacity:0.9;
text-align:center;
max-width:800px;
margin:auto;
line-height:1.7;
}

/* feature icons */

.feature-icons{
margin-top:40px;
display:flex;
justify-content:center;
gap:40px;
flex-wrap:wrap;
}

.icon-box{
font-size:38px;
color:#ffd200;
}

/* SERVICES */

.services-section{
margin-top:100px;
}

.services-title{
text-align:center;
font-size:45px;
font-weight:700;
margin-bottom:60px;
}

/* cards */

.service-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(12px);
border:none;
border-radius:25px;
padding:35px;
text-align:center;
color:white;
transition:0.4s;
box-shadow:0 20px 40px rgba(0,0,0,0.3);
}

.service-card:hover{
transform:translateY(-10px) scale(1.05);
background:rgba(255,255,255,0.15);
}

.service-icon{
font-size:42px;
margin-bottom:15px;
color:#ffd200;
}

`}</style>

<div className="services-page">

{/* floating background */}

<div className="bubble b1"></div>
<div className="bubble b2"></div>
<div className="bubble b3"></div>

{/* SECTION 1 — PROJECT INFO */}

<Container>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>

<h1 className="info-title">
SafeGesture AI Safety System
</h1>

<p className="info-text">

SafeGesture is an AI powered women safety platform where users can trigger
an SOS alert using a simple gesture. The system automatically records evidence,
shares live location and notifies authorities instantly to ensure fast emergency response.

</p>

{/* icons row */}

<div className="feature-icons">

<motion.div whileHover={{scale:1.2}} className="icon-box">
<FaShieldAlt/>
</motion.div>

<motion.div whileHover={{scale:1.2}} className="icon-box">
<FaMapMarkedAlt/>
</motion.div>

<motion.div whileHover={{scale:1.2}} className="icon-box">
<FaVideo/>
</motion.div>

<motion.div whileHover={{scale:1.2}} className="icon-box">
<FaBell/>
</motion.div>

</div>

</motion.div>

</Container>


{/* SECTION 2 — SERVICES */}

<div className="services-section">

<Container>

<h2 className="services-title">
Core Safety Services
</h2>

<Row>

{services.map((service,i)=>(

<Col md={4} key={i} className="mb-4">

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6,delay:i*0.1}}
viewport={{once:true}}
>

<Card className="service-card">

<div className="service-icon">
{service.icon}
</div>

<h5>{service.title}</h5>
<p>{service.desc}</p>

</Card>

</motion.div>

</Col>

))}

</Row>

</Container>

</div>

</div>

</>

);

};

export default Services;