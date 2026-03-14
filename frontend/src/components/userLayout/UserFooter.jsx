import React from "react";
import { motion } from "framer-motion";

const UserFooter = () => {

return(

<motion.div
className="user-footer"
initial={{opacity:0}}
animate={{opacity:1}}
transition={{delay:0.4}}
>

<p>© 2026 SafeGesture AI Safety System</p>

<style>{`

.user-footer{
text-align:center;
padding:12px;
background:rgba(0,0,0,0.4);
font-size:13px;
opacity:0.8;
}

`}</style>

</motion.div>

);

};

export default UserFooter;