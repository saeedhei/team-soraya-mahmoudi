import { LOGIN_MUTATION } from '@/graphql/mutations/authMutations';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import PublicLayout from '@/layouts/PublicLayout';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { redirectToDashboard } from '@/utils/redirectToDashboard';
import { useState } from 'react';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const { user, token, login , loading} = useAuth();
  const [status, setStatus] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  
  if (loading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  if (token && user) {
    return <Navigate to={redirectToDashboard(user.role)} replace />;
  }

  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login Data:', data);

    try {
      const { data: loginResponse } = await loginMutation({
        variables: {
          data: {
            email: data.email,
            password: data.password,
          },
        },
      });

      const { token, user } = loginResponse.login;
      login(user, token);
    } catch (error: any) {
      console.error('Error during login:', error);
      setStatus(error?.message || 'Login failed');
    }
  };

  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Login</h1>
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
          {/* Status Message */}

          {status && <p className="text-red-500 text-sm text-center">{status}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}
