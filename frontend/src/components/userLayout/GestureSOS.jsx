import React, { useRef, useState } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const GestureSOS = () => {

const canvasRef = useRef(null);
const [drawing,setDrawing] = useState(false);
const [points,setPoints] = useState([]);

const token = localStorage.getItem("token");


const startDrawing = (e)=>{
setDrawing(true);

const rect = canvasRef.current.getBoundingClientRect();

setPoints([
{
x:e.clientX - rect.left,
y:e.clientY - rect.top
}
]);
};


const draw = (e)=>{

if(!drawing) return;

const rect = canvasRef.current.getBoundingClientRect();

const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

setPoints(prev=>[...prev,{x,y}]);

const ctx = canvasRef.current.getContext("2d");

ctx.lineWidth = 4;
ctx.lineCap = "round";
ctx.strokeStyle = "#ff4d4d";

ctx.lineTo(x,y);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(x,y);

};


const stopDrawing = ()=>{
setDrawing(false);

checkGesture();
};


const checkGesture = ()=>{

if(points.length < 30){
clearCanvas();
return;
}

const start = points[0];
const mid = points[Math.floor(points.length/2)];
const end = points[points.length-1];

const zGesture =
start.x < mid.x &&
mid.x > end.x &&
start.y < mid.y &&
mid.y < end.y;

if(zGesture){

triggerSOS();

}

clearCanvas();

};


const clearCanvas = ()=>{

const ctx = canvasRef.current.getContext("2d");

ctx.clearRect(
0,
0,
canvasRef.current.width,
canvasRef.current.height
);

setPoints([]);

};


const triggerSOS = async ()=>{

try{

await axios.post(
"http://localhost:5000/api/alerts/sos",
{},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

Swal.fire({
icon:"success",
title:"SOS Triggered 🚨",
text:"Authorities have been notified"
});

}catch(err){

Swal.fire({
icon:"error",
title:"SOS Failed"
});

}

};


return(

<>

<style>{`

.gesture-page{
padding:20px;
color:white;
}

.gesture-card{
background:rgba(255,255,255,0.1);
backdrop-filter:blur(10px);
border:none;
border-radius:20px;
padding:20px;
text-align:center;
box-shadow:0 10px 30px rgba(0,0,0,0.4);
}

canvas{
background:white;
border-radius:10px;
margin-top:15px;
touch-action:none;
}

.instruction{
margin-top:15px;
font-size:14px;
opacity:0.8;
}

`}</style>


<div className="gesture-page">

<Container>

<motion.div
initial={{opacity:0,y:40}}
animate={{opacity:1,y:0}}
transition={{duration:0.6}}
>

<Card className="gesture-card">

<h4>Draw Z Gesture to Trigger SOS</h4>

<canvas
ref={canvasRef}
width={300}
height={300}

onMouseDown={startDrawing}
onMouseMove={draw}
onMouseUp={stopDrawing}
onMouseLeave={stopDrawing}

/>

<p className="instruction">

Draw the letter <b>Z</b> on the screen to activate the emergency alert.

</p>

</Card>

</motion.div>

</Container>

</div>

</>

);

};

export default GestureSOS;