import React, { useEffect, useState, useCallback } from "react";
import { Container, Card } from "react-bootstrap";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

const LiveTracking = () => {

const [position, setPosition] = useState(null);

const token = localStorage.getItem("token");


/* UPDATE MAP POSITION */

const UpdateMap = ({ position }) => {

const map = useMap();

useEffect(()=>{

if(position){
map.setView(position,15);
}

},[position,map]);

return null;

};



/* GET GPS LOCATION */

const getLocation = useCallback(()=>{

navigator.geolocation.getCurrentPosition(

async(pos)=>{

const latitude = pos.coords.latitude;
const longitude = pos.coords.longitude;

const coords = [latitude,longitude];

setPosition(coords);

/* SEND LOCATION TO BACKEND */

try{

await axios.post(
"http://localhost:5000/api/location/update",
{
latitude,
longitude
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

}catch(err){

console.log("Location update failed",err);

}

},

(err)=>{

console.log("Location error:",err);

},

{
enableHighAccuracy:true,
timeout:10000,
maximumAge:0
}

);

},[token]);



/* START LIVE TRACKING */

useEffect(()=>{

getLocation();

const interval = setInterval(()=>{

getLocation();

},5000);

return ()=>clearInterval(interval);

},[getLocation]);



return(

<>

<style>{`

.map-page{

min-height:100vh;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
display:flex;
align-items:center;
justify-content:center;
padding:20px;

}

.map-card{

width:100%;
max-width:900px;
border:none;
border-radius:20px;
padding:20px;
background:white;
box-shadow:0 20px 50px rgba(0,0,0,0.3);

}

.map-title{

text-align:center;
font-weight:700;
margin-bottom:20px;

}

`}</style>


<div className="map-page">

<Container>

<Card className="map-card">

<h4 className="map-title">

📍 Live GPS Tracking

</h4>


{position ? (

<MapContainer
center={position}
zoom={15}
style={{height:"500px",width:"100%",borderRadius:"15px"}}
>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

<UpdateMap position={position}/>

<Marker position={position}>

<Popup>

You are here 🚶‍♀️

</Popup>

</Marker>

</MapContainer>

) : (

<p style={{textAlign:"center"}}>

Getting your location...

</p>

)}

</Card>

</Container>

</div>

</>

);

};

export default LiveTracking;