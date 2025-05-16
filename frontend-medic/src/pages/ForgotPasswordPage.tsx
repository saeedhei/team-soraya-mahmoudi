import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setMessage(data.message || "An error occurred");
    } catch (error) {
      setMessage("Something went wrong");
    }finally{
      setIsSubmitting(false);
    }
  };
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Enter your email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 "
            />
          </div>
          <button type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
            {isSubmitting ? "Sending..." : "Submit"}
          </button>
        </form>
        {message && (<p className={`mt-4 text-center text-sm ${
            message === "Something went wrong" ? "text-red-500" : "text-green-500"
          }`}>{message}</p>)}
          
      </div>
    );
  };
  export default ForgotPasswordPage;
