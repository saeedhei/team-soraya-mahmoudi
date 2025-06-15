import PublicLayout from '@/layouts/PublicLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (!token) {
        setStatus('No verification token found!');
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/verify?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Verification failed');
        }
        const data = await response.json();
        setStatus(data.message);

        if (data.message.includes('verified')) {
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (error) {
        setStatus('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, []);

  return (
    <PublicLayout>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md m20">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Email Verification</h1>
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <p
            className={`text-center text-sm ${
              status?.includes('successfully') || status?.toLowerCase().includes('verified')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </PublicLayout>
  );
};

export default VerifyEmailPage;
