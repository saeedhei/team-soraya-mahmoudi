import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicLayout from '@/layouts/PublicLayout';
import { useMutation } from '@apollo/client';
import { RESET_PASSWORD_MUTATION } from '@/graphql/mutations/authMutations';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const token = params.get('token');
  const email = params.get('email');

  const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !email) {
      setMessage('Invalid or missing token');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const { data } = await resetPassword({
        variables: {
          data: { email, token, newPassword },
        },
      });

      if (data?.resetPassword) {
        setMessage('Password reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setMessage('Failed to reset password. Try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PublicLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </PublicLayout>
  );
};
export default ResetPasswordPage;
