import { useEffect } from "react";
import { useMe } from "@/hooks/useMe";
import PublicLayout from "@/layouts/PublicLayout";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";


interface ProfileFormValues {
    username: string;
    email: string;
    currentPassword?: string;
    newPassword: string;
    confirmPassword?:string;
  }
export default function Profile() {
  const { user, loading, error } = useMe();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>();

  const [updateUser] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        email: user.email,
      });
    }
  }, [user, reset]);
  
  const onSubmit = async (formData: ProfileFormValues) => {
    try {
      await updateUser({
        variables: {
          id: user.id,
          input: {
            username: formData.username,
            email: formData.email,
          },
        },
      });
      alert("Profile updated successfully.");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Update failed.");
    }
  };
   
  const handlePasswordChange= async(formData: ProfileFormValues)=>{
    console.log("Submitted password form:", formData);
    alert("Password change submitted!")
  }
  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 mt-20 text-center">Error: {error.message}</p>;

  if (!user) return <p className="text-center mt-20">User not found.</p>;

  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Your Profile</h1>

         {/* Update profile form */}
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow p-6 space-y-6">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              id="username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              id="email"
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <p><strong>Role:</strong> {user.role}</p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {/* Change Password Section */}
        
        <form onSubmit={handleSubmit(handlePasswordChange)} className="mt-10 border-t pt-10 space-y-4">
           <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
           
            <div>
              <label htmlFor="currentPassword" className="block text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                {...register("currentPassword",{required: "Current password is required"})}
                className="w-full px-2 py-2 border rounded-xl focus:outline-none focus:ring-blue-500"
              />
              {errors.currentPassword && (<p className="text-red-500 text-sm">{errors.currentPassword.message}</p>)}
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                id="newPassword"
                {...register("newPassword",{
                  required: "New password is required",
                  minLength:{value:6, message: "Must be at least 6 characters"},
                  pattern:{
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                    message: "Must contain uppercase, number, and special character",
                  },
                })}
                className="w-full px-4 py-2 rounded-xl focus:outline-none focus:ring-blue-500"
              />
              {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
            </div>

            <div>
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm New Password</label>
          <input 
           type="password" 
           id="confirmPassword"
           {...register("confirmPassword",{
            required: "Please confirm your new password",
            validate: value => value === watch("newPassword") || "Passwords do not match",

           })}
           className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
        </div>
         
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
          >
            {isSubmitting ? "Updating..." : "Change Password"}
        </button>
           </form>
        
   
      </section>
    </PublicLayout>
  );
}
