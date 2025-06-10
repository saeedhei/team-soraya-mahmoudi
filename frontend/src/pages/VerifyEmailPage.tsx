import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("No verification token found!");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/verify?token=${token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Verification failed");
        }
        const data = await response.json();
        setStatus(data.message);
      } catch (error) {
        setStatus("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };
    verifyEmail();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <p className="text-center text-gray-500">{status}</p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
