import { useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { GET_DOCTORS } from '@/graphql/queries/doctorQueries';
import { useMutation } from '@apollo/client';
import { CREATE_APPOINTMENT } from '@/graphql/mutations/appointmentMutations';

interface AppointmentFormData {
  doctorId: string;
  date: string;
  time: string;
  notes?: string;
}

export default function BookAppointmentPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormData>();

  const [createAppointment] = useMutation(CREATE_APPOINTMENT);

  const { data: doctorsData, loading: doctorsLoading, error: doctorsError } = useQuery(GET_DOCTORS);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const { doctorId, date, notes } = data;
      const fullDateTime = `${date}T${data.time}`; 

      const response = await createAppointment({
        variables: {
          input: {
            doctorId,
            date: fullDateTime,
            notes,
          },
        },
      });

      const { userErrors, appointment } = response.data.createAppointment;

      if (userErrors.length > 0) {
        alert(userErrors[0].message);
        return;
      }

      alert(`Appointment created successfully for ${appointment.date.split('T')[0]} with doctor ID: ${appointment.doctor}`);

    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Something went wrong!');
    }
  };

  if (doctorsLoading) return <p className="text-center py-10">Loading doctors...</p>;
  if (doctorsError)
    return <p className="text-center py-10 text-red-500">Error: {doctorsError.message}</p>;

  return (
    <section className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Book a New Appointment</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 shadow-md rounded-xl space-y-5"
      >
        {/* Doctor Selection */}
        <div>
          <label htmlFor="doctorId" className="block text-gray-700 mb-1">
            Select Doctor
          </label>
          <select
            id="doctorId"
            {...register('doctorId', { required: 'Doctor is required' })}
            className="w-full px-3 py-2 border rounded-xl"
          >
            <option value="">-- Choose a Doctor --</option>
            {doctorsData?.getDoctors.map((doctor: any) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.username} ({doctor.specialization})
              </option>
            ))}
          </select>
          {errors.doctorId && (
            <p className="text-red-500 text-sm mt-1">{errors.doctorId.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'Date is required' })}
            className="w-full px-3 py-2 border rounded-xl"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div>
          <label htmlFor="time" className="block text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            id="time"
            {...register('time', { required: 'Time is required' })}
            className="w-full px-3 py-2 border rounded-xl"
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            className="w-full px-3 py-2 border rounded-xl"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {isSubmitting ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </section>
  );
}
