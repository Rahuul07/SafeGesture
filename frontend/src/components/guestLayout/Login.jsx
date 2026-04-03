import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaUser, FaUserShield } from "react-icons/fa";
import { MdLocalPolice } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {

const navigate = useNavigate();

const [formData,setFormData] = useState({
email:"",
password:""
});

// 🔥 FORGOT PASSWORD STATES
const [showForgot,setShowForgot] = useState(false);
const [otpStep,setOtpStep] = useState(false);

const [resetData,setResetData] = useState({
email:"",
otp:"",
newPassword:""
});

// UI states (same)
const [selectedRole, setSelectedRole] = useState("user");
const [showRoleBox, setShowRoleBox] = useState(false);

const handleChange = (e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleResetChange = (e)=>{
setResetData({
...resetData,
[e.target.name]:e.target.value
});
};

const showPopup = (msg,color="success")=>{

Swal.fire({
icon: color === "success" ? "success" : "error",
title: msg,
showConfirmButton: true,
confirmButtonColor: "#ff7a18",
background: "#1f2937",
color: "white",
backdrop: `rgba(0,0,0,0.7)`
});

};

// ===============================
// LOGIN (UNCHANGED)
// ===============================

const handleSubmit = async (role)=>{

try{

const res = await axios.post(
"http://localhost:5000/api/users/login",
{
...formData,
role: role || selectedRole
}
);

localStorage.setItem("token",res.data.token);
localStorage.setItem("role",res.data.role);

showPopup("Login Successful ✅","success");

setShowRoleBox(false);

setTimeout(()=>{

if(res.data.role === "admin"){
navigate("/admin/dashboard");
}
else if(res.data.role === "police"){
navigate("/police/dashboard");
}
else{
navigate("/user/dashboard");
}

},2000);

}catch(error){

if(error.response?.data?.message){
showPopup(error.response.data.message,"danger");
}
else{
showPopup("Invalid Email or Password","danger");
}

}

};

// ===============================
// SEND OTP (FIXED)
// ===============================

const sendOtp = async ()=>{
try{

await axios.post(
"http://localhost:5000/api/users/forgot-password",
{ email: resetData.email }
);

showPopup("OTP Sent to Email 📩");

// ❌ DO NOT CLEAR EMAIL (IMPORTANT)
setOtpStep(true);

}catch(err){
showPopup(err.response?.data?.message || "Error","danger");
}
};

// ===============================
// RESET PASSWORD
// ===============================

const resetPassword = async ()=>{
try{

await axios.post(
"http://localhost:5000/api/users/reset-password",
resetData
);

showPopup("Password Reset Successful ✅");

setShowForgot(false);
setOtpStep(false);

}catch(err){
showPopup(err.response?.data?.message || "Error","danger");
}
};

return(
<>

<style>{`

.login-page{
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

.login-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(15px);
border:none;
border-radius:25px;
padding:40px;
color:white;
box-shadow:0 20px 50px rgba(0,0,0,0.4);
}

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

.login-btn{
margin-top:15px;
background:linear-gradient(45deg,#ff7a18,#ffd200);
border:none;
border-radius:30px;
padding:10px;
font-weight:bold;
}

.login-btn:hover{
transform:scale(1.05);
}

.role-box{
position:absolute;
right:-200px;
top:0;
background:rgba(0,0,0,0.85);
padding:15px;
border-radius:12px;
width:180px;
}

.role-item{
display:flex;
align-items:center;
gap:10px;
padding:8px;
border-radius:8px;
cursor:pointer;
transition:0.3s;
}

.role-item:hover{
background:rgba(255,255,255,0.1);
}

.role-active{
background:linear-gradient(45deg,#ff7a18,#ffd200);
color:black;
font-weight:bold;
}

`}</style>

<div className="login-page">

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

<Card className="login-card">

<h3 className="text-center mb-4">
Login to SafeGesture
</h3>

<Form onSubmit={(e)=>e.preventDefault()}>

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

<p
style={{cursor:"pointer",color:"#ffd200"}}
onClick={()=>setShowForgot(true)}
>
Forgot Password?
</p>

<div style={{ position:"relative" }}>

<Button
type="button"
className="w-100 login-btn"
onClick={()=>setShowRoleBox(!showRoleBox)}

>

Login </Button>

<AnimatePresence>
{showRoleBox && (
<motion.div className="role-box">

<div className={`role-item ${selectedRole==="user" && "role-active"}`}
onClick={()=>{setSelectedRole("user");handleSubmit("user");}}>
<FaUser/> User
</div>

<div className={`role-item ${selectedRole==="police" && "role-active"}`}
onClick={()=>{setSelectedRole("police");handleSubmit("police");}}>
<MdLocalPolice/> Police
</div>

<div className={`role-item ${selectedRole==="admin" && "role-active"}`}
onClick={()=>{setSelectedRole("admin");handleSubmit("admin");}}>
<FaUserShield/> Admin
</div>

</motion.div>
)} </AnimatePresence>

</div>

</Form>

<p className="text-center mt-3">
Don't have an account?{" "}
<span style={{cursor:"pointer",color:"#ffd200"}}
onClick={()=>navigate("/register")}>
Register
</span>
</p>

</Card>

</motion.div>

</Col>
</Row>
</Container>

</div>

{/* 🔥 RESET PASSWORD POPUP */}

{showForgot && (

<div style={{
position:"fixed",
top:0,left:0,right:0,bottom:0,
background:"rgba(0,0,0,0.75)",
display:"flex",
alignItems:"center",
justifyContent:"center",
zIndex:999
}}>

<motion.div
initial={{scale:0.7,opacity:0}}
animate={{scale:1,opacity:1}}
transition={{duration:0.4}}
style={{
background:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
padding:"35px",
borderRadius:"25px",
width:"380px",
color:"white",
boxShadow:"0 20px 60px rgba(0,0,0,0.6)",
backdropFilter:"blur(20px)",
border:"1px solid rgba(255,255,255,0.1)"
}}

>

<h4 style={{textAlign:"center",marginBottom:"20px"}}>
🔐 Reset Password
</h4>

{!otpStep ? (
<> <input
className="form-control mb-3"
placeholder="Enter Email"
name="email"
value={resetData.email}
onChange={handleResetChange}
/>

<Button
className="w-100 login-btn"
onClick={sendOtp}

>

Send OTP </Button>
</>
) : (
<> <input
className="form-control mb-3"
placeholder="Enter OTP"
name="otp"
value={resetData.otp}
onChange={handleResetChange}
/>

<input
className="form-control mb-3"
placeholder="New Password"
name="newPassword"
type="password"
value={resetData.newPassword}
onChange={handleResetChange}
/>

<Button
className="w-100 login-btn"
onClick={resetPassword}

>

Reset Password </Button>
</>
)}

<Button
className="w-100 mt-3"
variant="danger"
onClick={()=>setShowForgot(false)}

>

Close </Button>

</motion.div>

</div>
)}

</>
);

};

export default Login;
