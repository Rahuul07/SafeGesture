import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt } from "react-icons/fa";

const UserHeader = () => {

return(

<motion.div
className="user-header"
initial={{y:-50,opacity:0}}
animate={{y:0,opacity:1}}
transition={{duration:0.6}}
>

<h4>
<FaShieldAlt/> SafeGesture
</h4>

<span>AI Women Safety System</span>

<style>{`

.user-header{
display:flex;
justify-content:space-between;
align-items:center;
padding:15px 25px;
background:rgba(0,0,0,0.3);
backdrop-filter:blur(10px);
border-bottom:1px solid rgba(255,255,255,0.1);
}

.user-header h4{
display:flex;
gap:10px;
align-items:center;
font-weight:600;
}

.user-header span{
font-size:14px;
opacity:0.8;
}

@media(max-width:768px){

.user-header{
flex-direction:column;
gap:5px;
}

}

`}</style>

</motion.div>

);

};

export default UserHeader;