import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
FaMapMarkedAlt,
FaMobileAlt,
FaVideo,
FaBell
} from "react-icons/fa";
import safetyImg from "/SafeGesture/frontend/src/assets/safetyImg.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
const navigate = useNavigate();

const features = [
{
icon:<FaMobileAlt/>,
title:"Gesture SOS",
desc:"Draw Z pattern to instantly trigger emergency alert."
},
{
icon:<FaMapMarkedAlt/>,
title:"Live Tracking",
desc:"Real time GPS tracking allows authorities to locate users."
},
{
icon:<FaVideo/>,
title:"Auto Recording",
desc:"Camera records 15 seconds evidence automatically."
},
{
icon:<FaBell/>,
title:"Instant Alert",
desc:"Nearby police instantly receive SOS notification."
}
];

return(
<>

<style>{`

/* ===== ADDED BACKGROUND WRAPPER ===== */

.about-page{
min-height:100vh;
background: linear-gradient(135deg,#0ea5e9,#0284c7,#0369a1);
background-size:300% 300%;
animation:gradientMove 14s ease infinite;
}

@keyframes gradientMove{
0%{background-position:0% 50%}
50%{background-position:100% 50%}
100%{background-position:0% 50%}
}

/* ===== YOUR ORIGINAL STYLES (UNCHANGED) ===== */

.hero{
min-height:100vh;
display:flex;
align-items:center;
background:transparent;
position:relative;
overflow:hidden;
color:white;
}

.hero-title{
font-size:56px;
font-weight:800;
}

.hero-text{
font-size:20px;
margin-top:20px;
opacity:0.95;
}

.hero-btn{
margin-top:35px;
background:#ff7a18;
border:none;
padding:12px 35px;
border-radius:30px;
font-size:18px;
}

.hero-btn:hover{
background:#ff9a3c;
transform:scale(1.08);
}

.hero-img{
max-width:420px;
width:100%;
display:block;
margin:auto;
filter:drop-shadow(0px 20px 40px rgba(0,0,0,0.25));
}

/* ---------- PHONE WRAPPER ---------- */

.phone-wrapper{
position:relative;
display:flex;
justify-content:center;
align-items:center;
}

/* ---------- FINGERPRINT SCANNER ---------- */

.fingerprint-scan{
position:absolute;
width:120px;
height:120px;
border-radius:50%;
border:3px solid #38bdf8;
box-shadow:
0 0 10px #38bdf8,
0 0 20px #38bdf8,
0 0 40px #38bdf8;
animation:scanPulse 2s infinite ease-in-out;
}

/* SCAN ANIMATION */

@keyframes scanPulse{

0%{
transform:scale(0.8);
opacity:0.6;
}

50%{
transform:scale(1.1);
opacity:1;
}

100%{
transform:scale(0.8);
opacity:0.6;
}

}

.floating{
position:absolute;
border-radius:50%;
background:rgba(255,255,255,0.15);
animation:float 7s infinite ease-in-out;
}

.float1{
width:120px;
height:120px;
top:12%;
left:10%;
}

.float2{
width:90px;
height:90px;
bottom:20%;
right:15%;
}

.float3{
width:60px;
height:60px;
top:40%;
right:30%;
}

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(-25px);}
100%{transform:translateY(0px);}
}

/* FEATURES */

.features{
padding:100px 0;
background:transparent;
}

.features h2{
color:white;
font-weight:700;
font-size:50px;
}

.feature-card{
border:none;
padding:35px;
border-radius:25px;
text-align:center;
background:white;
box-shadow:0 15px 40px rgba(0,0,0,0.1);
transition:0.4s;
}

.feature-card:hover{
transform:translateY(-10px);
box-shadow:0 25px 60px rgba(0,0,0,0.15);
}

.feature-icon{
font-size:45px;
color:#0284c7;
margin-bottom:15px;
}

/* STATS */

.stats{
background:transparent;
padding:90px 0;
text-align:center;
color:white;
}

.stat{
font-size:50px;
font-weight:bold;
color:white;
}

.stats p{
font-size:25px;
}

/* WORKFLOW */

.workflow{
padding:90px 0;
background:transparent;
text-align:center;
color:white;
}

.workflow h2{
font-size:50px;
font-weight:700;
}

.step{
padding:25px;
}

.step-number{
font-size:42px;
font-weight:bold;
color:white;
}

.step p{
font-size:20px;
}

/* CTA */

.cta{
padding:100px 0;
text-align:center;
background:transparent;
color:white;
}

.cta h2{
font-size:42px;
font-weight:700;
}

.cta p{
font-size:28px;
}

/* RESPONSIVE */

@media(max-width:768px){

.hero-title{
font-size:38px;
text-align:center;
}

.hero-text{
text-align:center;
}

.hero-btn{
display:block;
margin:30px auto;
}

}

`}</style>

{/* ===== ADDED PAGE WRAPPER ===== */}

<div className="about-page">

{/* HERO SECTION */}

<div className="hero">

<div className="floating float1"></div>
<div className="floating float2"></div>
<div className="floating float3"></div>

<Container>

<Row className="align-items-center">

<Col lg={6} md={12}>

<motion.div
initial={{opacity:0,y:60}}
animate={{opacity:1,y:0}}
transition={{duration:1}}
>

<h1 className="hero-title">
Smart AI Women Safety Platform
</h1>

<p className="hero-text">
SafeGesture is an intelligent emergency protection system
that activates instantly through gesture detection,
sending live location and evidence to authorities.
</p>

<Button
className="hero-btn"
onClick={() =>
document.getElementById("cta").scrollIntoView({
behavior: "smooth"
})
}
>
Start Protecting Yourself
</Button>

</motion.div>

</Col>

<Col lg={6} md={12}>

<div className="phone-wrapper">

<motion.img
src={safetyImg}
className="hero-img"
initial={{scale:0.8,opacity:0,y:30}}
animate={{scale:1,opacity:1,y:0}}
transition={{duration:1}}
whileHover={{scale:1.05}}
alt="Women Safety Illustration"
/>

<div className="fingerprint-scan"></div>

</div>

</Col>

</Row>

</Container>

</div>

{/* FEATURES */}

<div className="features">

<Container>

<h2 className="text-center mb-5 ">
Advanced Safety Technologies
</h2>

<Row>

{features.map((f,i)=>(
<Col md={3} sm={6} key={i} className="mb-4">

<motion.div
whileHover={{scale:1.06}}
whileTap={{scale:0.95}}
>

<Card className="feature-card">

<div className="feature-icon">{f.icon}</div>

<h5>{f.title}</h5>

<p>{f.desc}</p>

</Card>

</motion.div>

</Col>
))}

</Row>

</Container>

</div>

{/* STATS */}

<div className="stats">

<Container>

<Row>

<Col md={4}>
<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
viewport={{once:true}}
>
<div className="stat">500+</div>
<p>Users Protected</p>
</motion.div>
</Col>

<Col md={4}>
<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
viewport={{once:true}}
>
<div className="stat">120+</div>
<p>Alerts Resolved</p>
</motion.div>
</Col>

<Col md={4}>
<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
viewport={{once:true}}
>
<div className="stat">35+</div>
<p>Authorities Connected</p>
</motion.div>
</Col>

</Row>

</Container>

</div>

{/* WORKFLOW */}

<div className="workflow">

<Container>

<h2 className="mb-5">
How SafeGesture Works
</h2>

<Row>

<Col md={3} className="step">
<div className="step-number">1</div>
<p>Draw Z Gesture</p>
</Col>

<Col md={3} className="step">
<div className="step-number">2</div>
<p>Camera Records Evidence</p>
</Col>

<Col md={3} className="step">
<div className="step-number">3</div>
<p>Alert Sent to Authorities</p>
</Col>

<Col md={3} className="step">
<div className="step-number">4</div>
<p>Immediate Assistance Arrives</p>
</Col>

</Row>

</Container>

</div>

{/* CTA */}

<div className="cta" id="cta">

<Container>

<motion.div
initial={{opacity:0,y:40}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.8}}
viewport={{once:true}}
>

<h2>Join SafeGesture Today</h2>

<p>
Experience a smarter and safer future with AI powered protection.
</p>

<Button
className="hero-btn"
onClick={() => navigate("/register")}
>
Create Free Account
</Button>

</motion.div>

</Container>

</div>

</div>

</>
);

};

export default AboutUs;