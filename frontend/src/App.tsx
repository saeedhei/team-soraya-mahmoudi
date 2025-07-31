import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/login/page';
import Signup from '@/pages/Signup';
import PrivateRoute from '@/components/auth/PrivateRoute';
import DoctorDashboard from '@/pages/DoctorDashboard';
import PatientDashboard from '@/pages/PatientDashboard';
import Profile from '@/pages/Profile';

import DoctorLayout from '@/layouts/DoctorLayout';
import PatientLayout from '@/layouts/PatientLayout';
import DoctorAppointments from '@/pages/DoctorAppointments';
import PatientAppointments from '@/pages/PatientAppointments';
import BookAppointmentPage from '@/pages/BookAppointmentPage';
import RoleBasedRoute from '@/components/auth/RoleBasedRoute';
import ResetPasswordPage from '@/pages/ResetPasswordPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      <Route element={<RoleBasedRoute allowedRoles={['doctor']} />}>
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route
          path="/appointments"
          element={
            <DoctorLayout>
              <DoctorAppointments />
            </DoctorLayout>
          }
        />
      </Route>

      <Route element={<RoleBasedRoute allowedRoles={['patient']} />}>
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route
          path="/my-appointments"
          element={
            <PatientLayout>
              <PatientAppointments />
            </PatientLayout>
          }
        />
        <Route path="/book-appointment" element={<BookAppointmentPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
