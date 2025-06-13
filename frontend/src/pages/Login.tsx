import { useForm } from "react-hook-form";
import PublicLayout from "@/layouts/PublicLayout";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { redirectToDashboard } from "@/utils/redirectToDashboard";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { user, token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  if (token && user) {
    return <Navigate to={redirectToDashboard(user.role)} replace />;
  }

  const onSubmit = async (data: LoginFormValues) => {
    console.log("Login Data:", data);

    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          query: `
          mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password){
              token
              user{
                id
                username
                role
              }
            }
          }
          `,
          variables: {
            email: data.email,
            password: data.password,
          },
        }),
      });
      const responseData = await response.json();

      if (responseData.errors) {
        console.error(
          "Login failed:",
          JSON.stringify(responseData.errors, null, 2)
        );
        alert(responseData.errors[0]?.message || "Login failed");
      } else {
        const { token, user } = responseData.data.login;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = redirectToDashboard(user.role);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Login
        </h1>
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
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </section>
    </PublicLayout>
  );
}
