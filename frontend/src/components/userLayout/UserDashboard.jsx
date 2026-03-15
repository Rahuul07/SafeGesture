import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import {
FaShieldAlt,
FaMapMarkedAlt,
FaUsers,
FaVideo
} from "react-icons/fa";

const UserDashboard = () => {

return(

<>

<style>{`

.dashboard{
min-height:100vh;
background:linear-gradient(135deg,#fdfbfb,#ebedee);
padding:40px 20px;
}

/* HERO */

.hero{
text-align:center;
margin-bottom:60px;
}

.hero h1{
font-weight:700;
color:#2c3e50;
margin-bottom:15px;
}

.hero p{
font-size:18px;
color:#555;
max-width:650px;
margin:auto;
}

/* FEATURE CARDS */

.feature-card{
background:white;
border:none;
border-radius:20px;
padding:30px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.08);
transition:0.3s;
height:100%;
margin:20px;

}

.feature-card:hover{
transform:translateY(-10px);
box-shadow:0 20px 40px rgba(0,0,0,0.15);
}

/* ICON */

.icon{
font-size:40px;
margin-bottom:15px;
color:#ff5e62;
}

/* FLOATING ANIMATION */

.floating{
animation:float 4s ease-in-out infinite;
}

@keyframes float{
0%{transform:translateY(0px)}
50%{transform:translateY(-12px)}
100%{transform:translateY(0px)}
}

/* ILLUSTRATION */

.hero-img{
width:120px;
margin:20px auto;
display:block;
}

/* MOBILE */

@media(max-width:768px){

.hero h1{
font-size:26px;
}

.hero p{
font-size:15px;
}

}

`}</style>


<div className="dashboard">

<Container>

{/* HERO */}

<motion.div
className="hero"
initial={{opacity:0,y:-40}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
>

<img
className="hero-img floating"
src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
alt="safety"
/>

<h1>Welcome to Women Safety System</h1>

<p>
Your personal safety companion designed to provide quick emergency
support, location tracking, and secure evidence reporting whenever
you need help.
</p>

</motion.div>


{/* FEATURES */}

<Row className="g-6">

<Col md={6}>

<motion.div
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:0.2}}
>

<Card className="feature-card">

<div className="icon">
<FaShieldAlt/>
</div>

<h5>Emergency Protection</h5>

<p>
Instantly access emergency tools that help notify authorities and
trusted contacts when you feel unsafe.
</p>

</Card>

</motion.div>

</Col>


<Col md={6}>

<motion.div
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:0.4}}
>

<Card className="feature-card">

<div className="icon">
<FaMapMarkedAlt/>
</div>

<h5>Live Location Tracking</h5>

<p>
Share your real-time location with trusted contacts so they always
know where you are.
</p>

</Card>

</motion.div>

</Col>


<Col md={6}>

<motion.div
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:0.6}}
>

<Card className="feature-card">

<div className="icon">
<FaUsers/>
</div>

<h5>Emergency Contacts</h5>

<p>
Add trusted friends or family members who will receive alerts
during emergency situations.
</p>

</Card>

</motion.div>

</Col>


<Col md={6}>

<motion.div
whileHover={{scale:1.05}}
initial={{opacity:0,y:30}}
animate={{opacity:1,y:0}}
transition={{delay:0.8}}
>

<Card className="feature-card">

<div className="icon">
<FaVideo/>
</div>

<h5>Evidence Upload</h5>

<p>
Securely upload photos or videos that can help authorities
during emergency investigations.
</p>

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