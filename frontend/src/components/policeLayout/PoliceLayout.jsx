import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import PoliceHeader from "./PoliceHeader";
import PoliceSidebar from "./PoliceSidebar";
import PoliceFooter from "./PoliceFooter";

const PoliceLayout = () => {

const [sidebarOpen, setSidebarOpen] = useState(false);

return (

<div className="layout">

<PoliceHeader toggleSidebar={() => setSidebarOpen(true)} />

<PoliceSidebar
isOpen={sidebarOpen}
closeSidebar={() => setSidebarOpen(false)}
/>

<div className="content">
<Outlet />
</div>

<PoliceFooter />

<style>{`
.layout{
min-height:100vh;
background:#0f172a;
color:white;
}

.content{
padding:20px;
}
`}</style>

</div>

);

};

export default PoliceLayout;