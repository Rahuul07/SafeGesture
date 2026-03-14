
import Home from "./components/guestLayout/Home";
import AboutUs from "./components/guestLayout/AboutUs";


import Services from "./components/guestLayout/Services";
import Features from "./components/guestLayout/Features";
import Login from "./components/guestLayout/Login";
import Register from "./components/guestLayout/Register";
import GuestLayout from "./components/guestLayout/GuestLayout";
import { Route, Routes } from "react-router-dom";
import UserLayout from "./components/userLayout/UserLayout";

function App(){

 return(

 

   <Routes>
    <Route path="/" element={<GuestLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/aboutus" element={<AboutUs/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/features" element={<Features/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    </Route>

     <Route path="/user-dashboard" element={<UserLayout/>}>
{/* <Route path="/gesture-sos" element={<GestureSOS />} />
<Route path="/live-tracking" element={<LiveTracking />} />
<Route path="/emergency-contact" element={<EmergencyContact />} />
<Route path="/evidence-upload" element={<EvidenceUpload />} /> */}
</Route>
   </Routes>

 

 );

}

export default App;