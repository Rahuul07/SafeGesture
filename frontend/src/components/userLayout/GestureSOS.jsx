import React, { useRef, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const GestureSOS = () => {

const videoRef = useRef(null);
const mediaRecorderRef = useRef(null);
const streamRef = useRef(null);

const [recording, setRecording] = useState(false);
const [countdown, setCountdown] = useState(null);

const token = localStorage.getItem("token");

let holdTimer;


/* GET LOCATION */

const getLocation = ()=>{

return new Promise((resolve,reject)=>{

navigator.geolocation.getCurrentPosition(

(pos)=> resolve({
lat:pos.coords.latitude,
lng:pos.coords.longitude
}),

(err)=> reject(err),

{enableHighAccuracy:true}

);

});

};



/* START RECORDING */

const startRecording = async(alertId)=>{

try{

const stream = await navigator.mediaDevices.getUserMedia({
video:true,
audio:true
});

streamRef.current = stream;

/* SHOW CAMERA */

videoRef.current.srcObject = stream;

const mediaRecorder = new MediaRecorder(stream);
mediaRecorderRef.current = mediaRecorder;

const chunks = [];

mediaRecorder.ondataavailable = (e)=>{
chunks.push(e.data);
};

mediaRecorder.onstop = async ()=>{

try{

/* CREATE VIDEO */

const blob = new Blob(chunks,{type:"video/webm"});

const formData = new FormData();
formData.append("video",blob);
formData.append("alertId",alertId);

/* UPLOAD VIDEO */

await axios.post(
"http://localhost:5000/api/evidence/upload",
formData,
{
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"multipart/form-data"
}
}
);

/* 🔥 STOP CAMERA + MIC (REAL HARDWARE STOP) */

if(streamRef.current){
streamRef.current.getTracks().forEach(track => track.stop());
}

/* REMOVE VIDEO STREAM */

if(videoRef.current){
videoRef.current.srcObject = null;
}

/* FINAL MESSAGE */

Swal.fire({
icon:"success",
title:"Recording Completed 🎥",
text:"Video captured & camera turned OFF"
});

}catch(err){

console.log("Upload error:",err);

}

};

/* START RECORDING */

mediaRecorder.start();
setRecording(true);

/* SHOW START MESSAGE */

Swal.fire({
icon:"info",
title:"Recording Started 🎥",
text:"Camera & microphone activated"
});

/* STOP AFTER 15 SEC */

setTimeout(()=>{

mediaRecorder.stop();
setRecording(false);

},15000);

}catch(err){

console.log("Camera error:",err);

Swal.fire({
icon:"error",
title:"Camera Access Denied"
});

}

};



/* LIVE TRACKING */

const startLiveTracking = ()=>{

setInterval(async ()=>{

try{

const location = await getLocation();

await axios.post(
"http://localhost:5000/api/location/update",
{
latitude:location.lat,
longitude:location.lng
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

}catch(err){

console.log("Location error:",err);

}

},5000);

};



/* TRIGGER SOS */

const triggerSOS = async ()=>{

try{

const location = await getLocation();

/* CREATE ALERT */

const alertRes = await axios.post(
"http://localhost:5000/api/alerts/sos",
{
latitude:location.lat,
longitude:location.lng
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const alertId = alertRes.data.alert._id;

/* ALERT MESSAGE */

Swal.fire({
icon:"success",
title:"SOS Triggered 🚨",
text:"Emergency alert sent successfully"
});

/* START RECORDING */

await startRecording(alertId);

/* START TRACKING */

startLiveTracking();

}catch(err){

console.log(err);

Swal.fire({
icon:"error",
title:"SOS Failed",
text:"Unable to trigger emergency"
});

}

};



/* HOLD BUTTON WITH COUNTDOWN */

const handleHoldStart = ()=>{

let time = 3;
setCountdown(time);

holdTimer = setInterval(()=>{

time--;
setCountdown(time);

if(time === 0){

clearInterval(holdTimer);
setCountdown(null);
triggerSOS();

}

},1000);

};

const handleHoldEnd = ()=>{
clearInterval(holdTimer);
setCountdown(null);
};



return(

<>

<style>{`

.page{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
background:linear-gradient(135deg,#e3f2fd,#ffffff);
}

.card-box{
text-align:center;
padding:40px;
border-radius:20px;
box-shadow:0 20px 40px rgba(0,0,0,0.1);
border:none;
align-items:center;
display:flex;
}

/* SOS BUTTON */

.sos-btn{
width:220px;
height:220px;
border-radius:50%;
background:radial-gradient(circle,#ff4b4b,#b30000);
border:none;
color:white;
font-size:34px;
font-weight:bold;
box-shadow:0 0 40px rgba(255,0,0,0.5);
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{transform:scale(1)}
50%{transform:scale(1.1)}
100%{transform:scale(1)}
}

/* COUNTDOWN */

.countdown{
font-size:60px;
color:red;
margin-top:20px;
font-weight:bold;
}

/* RECORDING TEXT */

.recording{
color:red;
margin-top:10px;
font-weight:bold;
}

/* CAMERA */

.video-box{
margin-top:25px;
width:260px;
height:160px;
border-radius:10px;
overflow:hidden;
margin-left:auto;
margin-right:auto;
}

video{
width:100%;
height:100%;
object-fit:cover;
}

`}</style>


<div className="page">

<Container>

<Card className="card-box">

<h3>Emergency SOS</h3>

<p>Hold for 3 seconds to activate</p>

<motion.button
className="sos-btn"
whileTap={{scale:0.9}}
onMouseDown={handleHoldStart}
onMouseUp={handleHoldEnd}
onTouchStart={handleHoldStart}
onTouchEnd={handleHoldEnd}
>

SOS

</motion.button>

{/* COUNTDOWN */}

{countdown !== null && (
<div className="countdown">{countdown}</div>
)}

{/* RECORDING */}

{recording && (
<p className="recording">🔴 Recording...</p>
)}

<div className="video-box">
<video ref={videoRef} autoPlay playsInline/>
</div>

</Card>

</Container>

</div>

</>

);

};

export default GestureSOS;