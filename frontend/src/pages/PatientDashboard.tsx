import { useAuth } from '@/contexts/AuthContext';
import { gql, useQuery } from '@apollo/client';

const GET_PATIENT_APPOINTMENTS = gql`
  query GetPatientAppointments($patientId: ID!) {
    getAppointments(patientId: $patientId) {
      id
      doctorName
      specialty
      date
      status
    }
  }
`;

export default function PatientDashboard() {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(GET_PATIENT_APPOINTMENTS, {
    variables: { patientId: user?.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
      <h2 className="mt-4 text-lg">Your Appointments</h2>
      <div className="mt-6">
        {data?.getAppointments.length === 0 ? (
          <p>No appointments scheduled.</p>
        ) : (
          <ul>
            {data.getAppointments.map((appointment: any) => (
              <li key={appointment.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="text-xl font-semibold"></p>
                <p className="text-gray-600"></p>
                <p className="text-gray-500"></p>
                <p
                  className={`text-sm mt-2 ${
                    appointment.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'
                  }`}
                >
                  Status:
                  {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                </p>

                <button className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
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
