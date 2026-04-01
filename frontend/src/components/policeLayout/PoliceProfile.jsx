import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import {
FaUserShield,
FaEnvelope,
FaPhone,
FaEdit,
FaSave
} from "react-icons/fa";

const PoliceProfile = () => {

const [user,setUser] = useState(null);
const [editMode,setEditMode] = useState(false);

const [formData,setFormData] = useState({
name:"",
phone:""
});

const [image,setImage] = useState(null);
const [preview,setPreview] = useState("");

const token = localStorage.getItem("token");


/* FETCH PROFILE */

const fetchProfile = useCallback(async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/users/profile",
{
headers:{ Authorization:`Bearer ${token}` }
}
);

setUser(res.data);

setFormData({
name:res.data.name,
phone:res.data.phone
});

// IMAGE FIX
if(res.data.image){
setPreview(`http://localhost:5000${res.data.image}`);
}

}catch(err){
console.log(err);
}

},[token]);

useEffect(()=>{
fetchProfile();
},[fetchProfile]);


/* INPUT CHANGE */

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};


/* IMAGE CHANGE */

const handleImageChange = (e)=>{
const file = e.target.files[0];

if(file){
setImage(file);
setPreview(URL.createObjectURL(file));
}
};


/* UPDATE PROFILE */

const handleUpdate = async ()=>{

try{

const form = new FormData();
form.append("name",formData.name);
form.append("phone",formData.phone);

if(image){
form.append("image",image);
}

await axios.put(
"http://localhost:5000/api/users/update-profile",
form,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

await fetchProfile();

setEditMode(false);

Swal.fire({
icon:"success",
title:"Police Profile Updated ✅"
});

}catch(err){

Swal.fire({
icon:"error",
title:"Update Failed ❌"
});

console.log(err);

}

};


return(

<>

<style>{`

.profile-page{
min-height:100vh;
background:linear-gradient(135deg,#0f172a,#1e293b);
padding:40px 20px;
color:white;
}

.profile-card{
background:#ffffff;
border:none;
border-radius:20px;
padding:35px;
box-shadow:0 20px 50px rgba(0,0,0,0.4);
text-align:center;
color:black;
}

.profile-img{
width:120px;
height:120px;
border-radius:50%;
overflow:hidden;
margin:0 auto 20px auto;
border:4px solid #22c55e;
cursor:pointer;
}

.profile-img img{
width:100%;
height:100%;
object-fit:cover;
}

.info{
display:flex;
align-items:center;
gap:10px;
margin:12px 0;
font-size:16px;
}

.icon{
color:#22c55e;
}

.edit-btn{
margin-top:20px;
border-radius:30px;
padding:8px 20px;
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

<label className="profile-img">

<img
src={
preview || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
}
alt="profile"
/>

{editMode && (
<Form.Control
type="file"
style={{display:"none"}}
onChange={handleImageChange}
/>
)}

</label>

<h4>🚓 Police Profile</h4>

{user ? (

<div>

<div className="info">
<FaUserShield className="icon"/>
<b>Name:</b>

{editMode ? (
<Form.Control
type="text"
name="name"
value={formData.name}
onChange={handleChange}
/>
) : user.name}

</div>

<div className="info">
<FaEnvelope className="icon"/>
<b>Email:</b> {user.email}
</div>

<div className="info">
<FaPhone className="icon"/>
<b>Phone:</b>

{editMode ? (
<Form.Control
type="text"
name="phone"
value={formData.phone}
onChange={handleChange}
/>
) : user.phone}

</div>

{editMode ? (

<Button
variant="success"
className="edit-btn"
onClick={handleUpdate}
>
<FaSave/> Save
</Button>

) : (

<Button
variant="primary"
className="edit-btn"
onClick={()=>setEditMode(true)}
>
<FaEdit/> Edit Profile
</Button>

)}

</div>

) : <p>Loading...</p>}

</Card>

</motion.div>

</Col>

</Row>

</Container>

</div>

</>

);

};

export default PoliceProfile;