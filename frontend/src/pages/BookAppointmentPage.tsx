import { useForm } from 'react-hook-form';

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

  const onSubmit = async (data: AppointmentFormData) => {
    console.log('Submitting appointment:', data);
    // TODO: send to backend via mutation
  };

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
            {/* TODO: fill with real doctors from backend */}
            <option value="1">Dr. Amini</option>
            <option value="2">Dr. Bahrami</option>
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
