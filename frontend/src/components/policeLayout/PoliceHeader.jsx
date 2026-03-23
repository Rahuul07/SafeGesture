import React from "react";
import { FaBars } from "react-icons/fa";

const PoliceHeader = ({ toggleSidebar }) => {

return (

<div style={{
height:"60px",
background:"#020617",
display:"flex",
alignItems:"center",
padding:"0 15px"
}}>

<FaBars
style={{fontSize:"22px",cursor:"pointer"}}
onClick={toggleSidebar}
/>

<h5 style={{marginLeft:"10px",color:"#facc15"}}>
🚓 Police Panel
</h5>

</div>

);

};

export default PoliceHeader;