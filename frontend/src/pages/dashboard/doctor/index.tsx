import { useAuth } from '@/contexts/useAuth';
import { gql, useQuery, useMutation } from '@apollo/client';
import { CONFIRM_APPOINTMENT } from '@/graphql/mutations/appointmentMutations';
import { Navigate } from 'react-router-dom';
import { RESET_PASSWORD_MUTATION } from '../../../graphql/mutations/authMutations';

const GET_DOCTOR_APPOINTMENTS = gql`
query GetDoctorAppointments {
  getAppointmentsForDoctor {
    _id
    patient {
      email
    }
    date
    time
    status
    notes
  }
}
`;

export default function DoctorDashboard() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!user._id) return <p>Loading user info...</p>;

  const { loading, error, data, refetch } = useQuery(GET_DOCTOR_APPOINTMENTS);

  const [confirmAppointment] = useMutation(CONFIRM_APPOINTMENT);

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await confirmAppointment({ variables: { appointmentId } });
      await refetch(); 
      console.log('Appointment confirmed');
    } catch (error) {
      console.error('Error confirming appointment', error);
    }
  };

  if (loading) return <p>Loading... </p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, Dr. {user.name}</h1>
      <h2 className="mt-4 text-lg">Your Appointments</h2>
      <div className="mt-6">
        {data?.getAppointmentsForDoctor.length === 0 ? (
          <p>No appointments pending.</p>
        ) : (
          <ul>
            {data.getAppointmentsForDoctor.map((appointment: any) => (
              <li key={appointment._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <p className="text-xl font-semibold">{appointment.patient.email}</p>
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
                  onClick={() => handleConfirmAppointment(appointment._id)}
                  className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Confirm Appointment
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}