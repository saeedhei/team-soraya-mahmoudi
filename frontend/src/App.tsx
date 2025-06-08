
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import PrivateRoute from "@/components/auth/PrivateRoute";
import DoctorDashboard from "@/pages/DoctorDashboard";
import PatientDashboard from "@/pages/PatientDashboard";
import Profile from "@/pages/Profile"; 

import DoctorLayout from "@/layouts/DoctorLayout";
import PatientLayout from "@/layouts/PatientLayout";
import DoctorAppointments from "@/pages/DoctorAppointments";
import PatientAppointments from "@/pages/PatientAppointments";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<PrivateRoute />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/profile" element={<Profile />} />
        
        <Route path="/appointments" element={
          <DoctorLayout>
            <DoctorAppointments />
          </DoctorLayout>
        } />
        <Route path="/my-appointments" element={
          <PatientLayout>
            <PatientAppointments />
          </PatientLayout>
        } />
      </Route>
    </Routes>
  );
}