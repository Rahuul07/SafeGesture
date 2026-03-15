import Home from "./components/guestLayout/Home";
import AboutUs from "./components/guestLayout/AboutUs";
import Services from "./components/guestLayout/Services";
import Features from "./components/guestLayout/Features";
import Login from "./components/guestLayout/Login";
import Register from "./components/guestLayout/Register";

import GuestLayout from "./components/guestLayout/GuestLayout";
import UserLayout from "./components/userLayout/UserLayout";



// import LiveTracking from "./components/userLayout/LiveTracking";
// import EmergencyContact from "./components/userLayout/EmergencyContact";
// import EvidenceUpload from "./components/userLayout/EvidenceUpload";

import { Route, Routes } from "react-router-dom";
import GestureSOS from "./components/userLayout/GestureSOS";
import UserDashboard from "./components/userLayout/UserDashboard";
import UserProfile from "./components/userLayout/UserProfile";

function App(){

 return(

   <Routes>

{/* ---------------- GUEST AREA ---------------- */}

<Route path="/" element={<GuestLayout/>}>

<Route index element={<Home/>}/>
<Route path="home" element={<Home/>}/>
<Route path="aboutus" element={<AboutUs/>}/>
<Route path="services" element={<Services/>}/>
<Route path="features" element={<Features/>}/>
<Route path="login" element={<Login/>}/>
<Route path="register" element={<Register/>}/>

</Route>


{/* ---------------- USER AREA ---------------- */}

<Route path="/" element={<UserLayout/>}>
<Route element ={<UserDashboard/>}/>
<Route path ="/user/dashboard" element={<UserDashboard/>}/>
 <Route path="/user/gesture-sos" element={<GestureSOS/>}/>
 <Route path ="/user/profile" element={<UserProfile/>}/> 
{/* //<Route path="live-tracking" element={<LiveTracking/>}/>
//<Route path="emergency-contact" element={<EmergencyContact/>}/>
//<Route path="evidence-upload" element={<EvidenceUpload/>}/>
 */}

</Route>


   </Routes>

 );

}

export default App;