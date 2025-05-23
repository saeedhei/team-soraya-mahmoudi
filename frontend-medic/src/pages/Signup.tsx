import { useForm } from "react-hook-form";
import PublicLayout from "@/layouts/PublicLayout";
import { useMutation, gql } from "@apollo/client";
import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { redirectToDashboard } from "@/utils/redirectToDashboard";


interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const SIGNUP_MUTATION= gql`
  mutation Signup($username:String!, $email:String!, $password:String!, $role: String!){
    signup(username:$username, email:$email, password:$password, role: $role){
      token
      user{
        id
        username
        role
      }
    }
  }
`;
export default function Signup() {
  const { user, token } = useAuth();

  if (token && user) {
    return <Navigate to={redirectToDashboard(user.role)} replace />;
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>();

  const [signup]= useMutation(SIGNUP_MUTATION);
  const [status, setStatus] = useState<string | null>(null);
  
  const onSubmit = async (data: SignupFormValues) => {
    console.log("Signup Data:", data);

    try{
      const response= await signup({
        variables:{
          username:data.username,
          email:data.email,
          password:data.password,
          role: "patient"
        },
      });
      console.log("Signup Data:", response.data);
      setStatus("Signup successful!");
      const { token, user } = response.data.signup;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = redirectToDashboard(user.role);

    }catch(error:any){
      console.error("Signup Error:", JSON.stringify(error, null, 2));
      setStatus("Signup failed. Please try again.");
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
          {/* Name Field */}
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Status Message */}
        {status && (
          <p
            className={`mt-2 text-center text-sm ${
              status === "Signup successful!" ? "text-green-500" : "text-red-500"
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
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}