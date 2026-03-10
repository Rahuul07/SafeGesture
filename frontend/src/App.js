import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./components/guestLayout/Home";
import AboutUs from "./components/guestLayout/AboutUs";
import Services from "./components/guestLayout/Services";
import Features from "./components/guestLayout/Features";
import Login from "./components/guestLayout/Login";
import Register from "./components/guestLayout/Register";
import GuestLayout from "./components/guestLayout/GuestLayout";

function App(){

 return(

  <BrowserRouter>

   <Routes>
    <Route path="/" element={<GuestLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/about" element={<AboutUs/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/features" element={<Features/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    </Route>

   </Routes>

  </BrowserRouter>

 );

}

export default App;