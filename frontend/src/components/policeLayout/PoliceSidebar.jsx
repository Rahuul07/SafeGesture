import React from "react";
import { useNavigate } from "react-router-dom";
import {
FaMapMarkedAlt,
FaBell,
FaHistory,
FaSignOutAlt,
FaTimes
} from "react-icons/fa";
import { motion } from "framer-motion";

const PoliceSidebar = ({ isOpen, closeSidebar }) => {

const navigate = useNavigate();

const menu = [
{ name:"Dashboard", icon:<FaMapMarkedAlt/>, path:"/police/dashboard" },
{ name:"Active Alerts", icon:<FaBell/>, path:"/police/alerts" },
{ name:"History", icon:<FaHistory/>, path:"/police/history" }
];

return (

<>

{isOpen && <div className="overlay" onClick={closeSidebar}></div>}

<motion.div
initial={false}
animate={{ x: isOpen ? 0 : -320 }}
transition={{ duration: 0.3 }}
className="sidebar"
>

{/* HEADER */}
<div className="sidebar-header">
<h4>🚓 Police Panel</h4>

<FaTimes
className="close-icon"
onClick={closeSidebar}
/>
</div>

{/* MENU */}
<div className="menu">

{menu.map((item,i)=>(
<motion.div
key={i}
whileTap={{ scale: 0.95 }}
className="menu-item"
onClick={()=>{
closeSidebar();
setTimeout(()=>{
navigate(item.path);
},200);
}}
>
{item.icon}
<span>{item.name}</span>
</motion.div>
))}

</div>

{/* LOGOUT */}
<div
className="logout"
onClick={()=>{
closeSidebar();
setTimeout(()=>{
localStorage.removeItem("token");
navigate("/login");
},200);
}}
>
<FaSignOutAlt/> Logout
</div>

</motion.div>

<style>{`

.overlay{
position:fixed;
top:0;
left:0;
width:100%;
height:100%;
background:rgba(0,0,0,0.6);
z-index:998;
}

.sidebar{
position:fixed;
top:0;
left:0;
width:270px;
height:100%;
background:#020617;
z-index:999;
padding:20px;
display:flex;
flex-direction:column;
box-shadow:5px 0 30px rgba(0,0,0,0.7);
will-change: transform;
}

/* HEADER */
.sidebar-header{
display:flex;
justify-content:space-between;
align-items:center;
color:#facc15;
margin-bottom:25px;
position:relative;
}

/* CLOSE BUTTON RIGHT */
.close-icon{
cursor:pointer;
font-size:22px;
color:white;
transition:0.3s;
}

.close-icon:hover{
transform:scale(1.2);
color:#ef4444;
}

/* MENU */
.menu{
flex:1;
display:flex;
flex-direction:column;
gap:12px;
}

.menu-item{
display:flex;
align-items:center;
gap:12px;
padding:15px;
border-radius:12px;
background:#0f172a;
cursor:pointer;
transition:0.3s;
}

.menu-item:hover{
background:#1e293b;
transform:translateX(6px);
}

/* LOGOUT */
.logout{
padding:15px;
border-radius:12px;
background:#7f1d1d;
text-align:center;
cursor:pointer;
}

.logout:hover{
background:#991b1b;
}

`}</style>

</>

);

};

export default PoliceSidebar;