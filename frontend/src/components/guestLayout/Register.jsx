import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {

const navigate = useNavigate();

const [formData,setFormData] = useState({
name:"",
email:"",
phone:"",
password:""
});

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e)=>{
e.preventDefault();

try{

await axios.post("http://localhost:5000/api/users/register",formData);

alert("Registration Successful");

navigate("/login");

}catch(error){

alert("Registration Failed");

}

};

return(
<>

<style>{`

.register-page{
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
background-size:300% 300%;
animation:gradientMove 12s ease infinite;
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
background:rgba(255,255,255,0.1);
animation:float 7s infinite ease-in-out;
}

.b1{width:140px;height:140px;top:15%;left:10%;}
.b2{width:90px;height:90px;bottom:20%;right:15%;}
.b3{width:70px;height:70px;top:45%;right:30%;}

@keyframes float{
0%{transform:translateY(0)}
50%{transform:translateY(-20px)}
100%{transform:translateY(0)}
}

/* card */

.register-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(15px);
border:none;
border-radius:25px;
padding:40px;
color:white;
box-shadow:0 20px 50px rgba(0,0,0,0.4);
}

/* inputs */

.form-control{
background:rgba(255,255,255,0.15);
border:none;
color:white;
}

.form-control::placeholder{
color:#e5e7eb;
}

.form-control:focus{
background:rgba(255,255,255,0.2);
color:white;
}

/* button */

.register-btn{
margin-top:15px;
background:linear-gradient(45deg,#ff7a18,#ffd200);
border:none;
border-radius:30px;
padding:10px;
font-weight:bold;
}

.register-btn:hover{
transform:scale(1.05);
}

`}</style>

<div className="register-page">

<div className="bubble b1"></div>
<div className="bubble b2"></div>
<div className="bubble b3"></div>

<Container>

<Row className="justify-content-center">

<Col md={6} lg={5}>

<motion.div
initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}
>

<Card className="register-card">

<h3 className="text-center mb-4">
Create Account
</h3>

<Form onSubmit={handleSubmit}>

<Form.Group className="mb-3">

<Form.Label><FaUser/> Name</Form.Label>

<Form.Control
type="text"
placeholder="Enter your name"
name="name"
value={formData.name}
onChange={handleChange}
required
/>

</Form.Group>

<Form.Group className="mb-3">

<Form.Label><FaEnvelope/> Email</Form.Label>

<Form.Control
type="email"
placeholder="Enter your email"
name="email"
value={formData.email}
onChange={handleChange}
required
/>

</Form.Group>

<Form.Group className="mb-3">

<Form.Label><FaPhone/> Phone</Form.Label>

<Form.Control
type="text"
placeholder="Enter phone number"
name="phone"
value={formData.phone}
onChange={handleChange}
required
/>

</Form.Group>

<Form.Group className="mb-3">

<Form.Label><FaLock/> Password</Form.Label>

<Form.Control
type="password"
placeholder="Enter password"
name="password"
value={formData.password}
onChange={handleChange}
required
/>

</Form.Group>

<Button
type="submit"
className="w-100 register-btn"
>

Register

</Button>

</Form>

<p className="text-center mt-3">

Already have an account?{" "}

<span
style={{cursor:"pointer",color:"#ffd200"}}
onClick={()=>navigate("/login")}
>

Login

</span>

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

export default Register;