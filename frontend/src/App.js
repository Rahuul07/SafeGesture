import { Route, Routes } from "react-router-dom";

// GUEST
import Home from "./components/guestLayout/Home";
import AboutUs from "./components/guestLayout/AboutUs";
import Services from "./components/guestLayout/Services";
import Features from "./components/guestLayout/Features";
import Login from "./components/guestLayout/Login";
import Register from "./components/guestLayout/Register";
import GuestLayout from "./components/guestLayout/GuestLayout";

// USER
import UserLayout from "./components/userLayout/UserLayout";
import UserDashboard from "./components/userLayout/UserDashboard";
import GestureSOS from "./components/userLayout/GestureSOS";
import UserProfile from "./components/userLayout/UserProfile";
import EmergencyContact from "./components/userLayout/EmergencyContacts";
import LiveTracking from "./components/userLayout/LiveTracking";

// POLICE
import PoliceLayout from "./components/policeLayout/PoliceLayout";
import PoliceDashboard from "./components/policeLayout/PoliceDashboard";

// ✅ ADMIN (ADD THESE FILES)
import AdminLayout from "./components/adminLayout/AdminLayout";
import AdminDashboard from "./components/adminLayout/AdminDashboard";

// 🔐 PROTECTED ROUTE
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute"; 

function App() {

  return (

    <Routes>

      {/* ---------------- GUEST AREA ---------------- */}
      <Route path="/" element={<GuestLayout />}>

        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route path="services" element={<Services />} />
        <Route path="features" element={<Features />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

         {/* 🔐 PUBLIC ROUTES (BLOCK IF LOGGED IN) */}
        <Route path="login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route path="register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

      </Route>

      {/* ---------------- USER AREA ---------------- */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="gesture-sos" element={<GestureSOS />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="live-tracking" element={<LiveTracking />} />
        <Route path="emergency-contact" element={<EmergencyContact />} />

      </Route>

      {/* ---------------- POLICE AREA ---------------- */}
      <Route
        path="/police"
        element={
          <ProtectedRoute role="police">
            <PoliceLayout />
          </ProtectedRoute>
        }
      >

        <Route path="dashboard" element={<PoliceDashboard />} />

      </Route>

      {/* ---------------- ADMIN AREA ---------------- */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route path="dashboard" element={<AdminDashboard />} />

      </Route>

    </Routes>

  );

}

export default App;