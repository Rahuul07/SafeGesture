import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaUser, FaPhone } from "react-icons/fa";

const EmergencyContact = () => {

const token = localStorage.getItem("token");

const [contacts,setContacts] = useState([]);

const [formData,setFormData] = useState({
name:"",
phone:""
});


/* HANDLE INPUT */

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};


/* ADD CONTACT */

const handleSubmit = async (e)=>{
e.preventDefault();

try{

const res = await axios.post(
"http://localhost:5000/api/users/add-contact",
formData,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setContacts(res.data.contacts);

Swal.fire({
icon:"success",
title:"Contact Added ✅",
confirmButtonColor:"#ff7a18"
});

setFormData({
name:"",
phone:""
});

}catch(err){

Swal.fire({
icon:"error",
title:"Failed to add contact"
});

}

};


/* LOAD EXISTING CONTACTS */

const fetchContacts = async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/users/profile",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setContacts(res.data.emergencyContacts || []);

}catch(err){

console.log(err);

}

};


useEffect(()=>{
fetchContacts();
},[]);



return(

<>

<style>{`

.contact-page{

min-height:100vh;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
display:flex;
align-items:center;
justify-content:center;
padding:20px;

}

.contact-card{

width:100%;
max-width:900px;
border:none;
border-radius:20px;
padding:30px;
background:white;
box-shadow:0 20px 50px rgba(0,0,0,0.3);

}

.contact-title{

text-align:center;
font-weight:700;
margin-bottom:20px;

}

.contact-list{

margin-top:25px;

}

.contact-item{

background:#f8fafc;
padding:15px;
border-radius:12px;
margin-bottom:10px;
display:flex;
justify-content:space-between;
align-items:center;

}

`}</style>


<div className="contact-page">

<Container>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
>

<Card className="contact-card">

<h4 className="contact-title">

📞 Emergency Contacts

</h4>


{/* FORM */}

<Form onSubmit={handleSubmit}>

<Row>

<Col md={5}>

<Form.Group>

<Form.Label><FaUser/> Name</Form.Label>

<Form.Control
type="text"
placeholder="Enter name"
name="name"
value={formData.name}
onChange={handleChange}
required
/>

</Form.Group>

</Col>

<Col md={5}>

<Form.Group>

<Form.Label><FaPhone/> Phone</Form.Label>

<Form.Control
type="text"
placeholder="Enter phone"
name="phone"
value={formData.phone}
onChange={handleChange}
required
/>

</Form.Group>

</Col>

<Col md={2} className="d-flex align-items-end">

<Button
type="submit"
className="w-100"
style={{background:"#ff7a18",border:"none"}}
>

Add

</Button>

</Col>

</Row>

</Form>


{/* CONTACT LIST */}

<div className="contact-list">

{contacts.length === 0 ? (

<p>No contacts added</p>

):( 

contacts.map((c,i)=>(

<motion.div
key={i}
className="contact-item"
whileHover={{scale:1.02}}
>

<div>

<strong>{c.name}</strong><br/>
<span>{c.phone}</span>

</div>

</motion.div>

))

)}

</div>

</Card>

</motion.div>

</Container>

</div>

</>

);

};

export default EmergencyContact;