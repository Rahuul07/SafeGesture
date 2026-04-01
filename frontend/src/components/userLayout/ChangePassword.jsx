import React, { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const ChangePassword = () => {

const [form,setForm] = useState({
oldPassword:"",
newPassword:"",
confirmPassword:""
});

const token = localStorage.getItem("token");

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e)=>{
e.preventDefault();

if(form.newPassword !== form.confirmPassword){
return Swal.fire({
icon:"error",
title:"Passwords do not match"
});
}

try{

await axios.put(
"http://localhost:5000/api/users/change-password",
{
oldPassword:form.oldPassword,
newPassword:form.newPassword
},
{
headers:{ Authorization:`Bearer ${token}` }
}
);

Swal.fire({
icon:"success",
title:"Password Changed Successfully 🔐"
});

setForm({
oldPassword:"",
newPassword:"",
confirmPassword:""
});

}catch(err){

Swal.fire({
icon:"error",
title: err.response?.data?.message || "Error"
});

}

};

return(

<>

<style>{`

.page{
min-height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
}

.card-box{
padding:30px;
border-radius:20px;
background:white;
width:100%;
max-width:800px;
}

.box{
display:flex;
align-items:center;
justify-content:center;
}

`}</style>

<div className="page">

<Container className="box">

<Card className="card-box">

<h4 className="text-center mb-3">
🔐 Change Password
</h4>

<Form onSubmit={handleSubmit}>

<Form.Group className="mb-3">
<Form.Label>Old Password</Form.Label>
<Form.Control
type="password"
name="oldPassword"
value={form.oldPassword}
onChange={handleChange}
required
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>New Password</Form.Label>
<Form.Control
type="password"
name="newPassword"
value={form.newPassword}
onChange={handleChange}
required
/>
</Form.Group>

<Form.Group className="mb-3">
<Form.Label>Confirm Password</Form.Label>
<Form.Control
type="password"
name="confirmPassword"
value={form.confirmPassword}
onChange={handleChange}
required
/>
</Form.Group>

<Button type="submit" className="w-100">
Update Password
</Button>

</Form>

</Card>

</Container>

</div>

</>

);

};

export default ChangePassword;