import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
FaBars,
FaTimes,
FaHandPaper,
FaMapMarkedAlt,
FaAddressBook,
FaVideo,
FaUser
} from "react-icons/fa";

const UserNavbar = () => {

const [menuOpen,setMenuOpen] = useState(false);

const toggleMenu = ()=>{
setMenuOpen(!menuOpen);
};

return(

<div className="navbar-wrapper">

{/* TOP BAR */}

<div className="navbar-top">

<h4 className="logo">SafeGesture</h4>

<div className="menu-icon" onClick={toggleMenu}>
{menuOpen ? <FaTimes/> : <FaBars/>}
</div>

</div>


{/* MENU LIST */}

<motion.div
className={`menu-list ${menuOpen ? "show" : ""}`}
initial={{height:0,opacity:0}}
animate={menuOpen ? {height:"auto",opacity:1} : {height:0,opacity:0}}
transition={{duration:0.4}}
>


<NavLink to="/user/gesture-sos" onClick={()=>setMenuOpen(false)}>
<FaHandPaper/> Gesture SOS
</NavLink>

<NavLink to="/live-tracking" onClick={()=>setMenuOpen(false)}>
<FaMapMarkedAlt/> Live Tracking
</NavLink>

<NavLink to="/emergency-contact" onClick={()=>setMenuOpen(false)}>
<FaAddressBook/> Emergency Contacts
</NavLink>

<NavLink to="/evidence-upload" onClick={()=>setMenuOpen(false)}>
<FaVideo/> Evidence Upload
</NavLink>

<NavLink to="/user/profile" onClick={()=>setMenuOpen(false)}>
<FaUser/> Profile
</NavLink>


</motion.div>


<style>{`

.navbar-wrapper{
background:rgba(0,0,0,0.5);
backdrop-filter:blur(10px);
border-bottom:1px solid rgba(255,255,255,0.1);
position:sticky;
top:0;
z-index:1000;
}

/* TOP BAR */

.navbar-top{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 20px;
color:white;
}

.logo{
font-weight:600;
}

/* MENU ICON */

.menu-icon{
font-size:22px;
cursor:pointer;
transition:0.3s;
}

.menu-icon:hover{
transform:scale(1.2);
color:#ffd200;
}

/* MENU LIST */

.menu-list{
display:flex;
flex-direction:column;
overflow:hidden;
background:rgba(0,0,0,0.7);
}

.menu-list a{
padding:15px 25px;
color:white;
text-decoration:none;
display:flex;
align-items:center;
gap:10px;
font-size:15px;
transition:0.3s;
}

.menu-list a:hover{
background:rgba(255,255,255,0.1);
color:#ffd200;
transform:translateX(5px);
}

.menu-list .active{
color:#ff7a18;
}

/* MOBILE */

@media(max-width:768px){

.logo{
font-size:18px;
}

}

`}</style>

</div>

);

};

export default UserNavbar;