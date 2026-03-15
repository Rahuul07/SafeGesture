import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import {
FaUser,
FaEnvelope,
FaPhone,
FaEdit
} from "react-icons/fa";

const UserProfile = () => {

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

return(

<>

<style>{`

.profile-page{
min-height:100vh;
background:linear-gradient(135deg,#f5f7fa,#c3cfe2);
padding:40px 20px;
}

/* PROFILE CARD */

.profile-card{
background:white;
border:none;
border-radius:20px;
padding:35px;
box-shadow:0 15px 40px rgba(0,0,0,0.1);
text-align:center;
}

/* PROFILE IMAGE */

.profile-img{
width:120px;
height:120px;
border-radius:50%;
background:#eaeaea;
display:flex;
align-items:center;
justify-content:center;
font-size:50px;
margin:0 auto 20px auto;
color:#555;
}

/* INFO ROW */

.info{
display:flex;
align-items:center;
gap:10px;
margin:12px 0;
font-size:16px;
color:#444;
}

/* ICON */

.icon{
color:#ff5e62;
}

/* EDIT BUTTON */

.edit-btn{
margin-top:20px;
border-radius:30px;
padding:8px 20px;
}

/* MOBILE */

@media(max-width:768px){

.profile-card{
padding:25px;
}

}

`}</style>

<div className="profile-page">

<Container>

<Row className="justify-content-center">

<Col md={6}>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
>

<Card className="profile-card">

<div className="profile-img">
<FaUser/>
</div>

<h4>User Profile</h4>

{user ? (

<div>

<div className="info">
<FaUser className="icon"/>
<b>Name:</b> {user.name}
</div>

<div className="info">
<FaEnvelope className="icon"/>
<b>Email:</b> {user.email}
</div>

<div className="info">
<FaPhone className="icon"/>
<b>Phone:</b> {user.phone}
</div>

<Button
variant="primary"
className="edit-btn"
>

<FaEdit/> Edit Profile

</Button>

</div>

) : (

<p>Loading profile...</p>

)}

</Card>

</motion.div>

</Col>

</Row>

</Container>

</div>

</>

);

};

export default UserProfile;