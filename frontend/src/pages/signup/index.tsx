import { useForm } from 'react-hook-form';
import PublicLayout from '@/layouts/PublicLayout';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { redirectToDashboard } from '@/utils/redirectToDashboard';
import PasswordStrength from '@/components/PasswordStrength';
import { SIGNUP_MUTATION } from '@/graphql/mutations/authMutations';

interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  role: 'patient' | 'doctor';
}

export default function Signup() {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  const [signup] = useMutation(SIGNUP_MUTATION);
  const [status, setStatus] = useState<string | null>(null);
  const passwordValue = watch('password');

  if (token && user) {
    return <Navigate to={redirectToDashboard(user.role)} replace />;
  }

  const onSubmit = async (data: SignupFormValues) => {
    console.log('Signup Data:', data);
    if (data.password !== data.confirmPassword) {
      setStatus('Password and Confirm Password do not match!');
      return;
    }
    try {
      const response = await signup({
        variables: {
          data: {
            email: data.email,
            password: data.password,
            role: data.role,
          },
        },
      });
      const {_id, role, isVerified }= response.data?.register;
      console.log('Signup Successful!');
      console.log('User ID:', _id);
      console.log('Role:', role);
      console.log('Is Verified:', isVerified);

      setStatus('Signup successful! Please check your email to verify your account.');
    } catch (error: unknown) {
      console.error('Signup Error:', error);
      setStatus('Signup failed. Please try again.');
    }
  };
  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Signup</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        >
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 mb-2">Role</label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <PasswordStrength password={passwordValue} />
          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
              })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Status Message */}
          {status && (
            <p
              className={`mt-2 text-center text-sm ${
                status.toLowerCase().startsWith('signup successful!') ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {status}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}
