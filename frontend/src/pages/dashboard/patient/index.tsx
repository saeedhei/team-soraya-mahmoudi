import { useAuth } from '@/contexts/useAuth';
import { gql, useQuery } from '@apollo/client';

import { Navigate } from 'react-router-dom';

const GET_PATIENT_APPOINTMENTS = gql`
query GetAppointmentsForPatient {
  getAppointmentsForPatient {
    id
    doctor {
      email
    }
    date
    time
    status
    notes
  }
}
`;

export default function PatientDashboard() {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) return <p>Loading authentication...</p>;
  if (!user) return <Navigate to="/login" replace />;

  const { loading, error, data } = useQuery(GET_PATIENT_APPOINTMENTS);

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <h2 className="mt-4 text-lg">Your Appointments</h2>
      <div className="mt-6">
        {data?.getAppointmentsForPatient.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul>
            {data.getAppointmentsForPatient.map((appointment: any) => (
              <li key={appointment.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="text-xl font-semibold">{appointment.doctor.email}</p>
                {/* <p className="text-gray-600">{appointment.specialty}</p> */}
                <p className="text-gray-500">Date: {appointment.date}</p>
                <p
                  className={`text-sm mt-2 ${
                    appointment.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  Status: {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </p>

                <button
                  disabled
                  className="mt-4 bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed"
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}