import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const UserLayout = () => {

return (

<div className="user-layout">



<UserNavbar />

<div className="user-content">

<Outlet />

</div>

<UserFooter />

<style>{`

.user-layout{
min-height:100vh;
display:flex;
flex-direction:column;
background:linear-gradient(135deg,#0f2027,#203a43,#2c5364);
color:white;
}

.user-content{
flex:1;
padding:0px;
}

`}</style>
</div>

);

};

export default UserLayout;