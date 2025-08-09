import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { useMutation } from '@apollo/client';
import { FORGOT_PASSWORD_MUTATION } from '@/graphql/mutations/authMutations';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);

  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const { data } = await forgotPassword({
        variables: { email },
      });
      if (data?.forgotPassword) {
        setMessage('If this email exists, a reset link has been sent.');
      } else {
        setMessage('Failed to send reset link. Try again.');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
      </section>
    </PublicLayout>
  );
};
export default ForgotPasswordPage;
