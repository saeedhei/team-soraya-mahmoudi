import { useMe } from "@/hooks/useMe";
import PublicLayout from "@/layouts/PublicLayout";

export default function Profile() {
  const { user, loading, error } = useMe();

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 mt-20 text-center">Error: {error.message}</p>;

  if (!user) return <p className="text-center mt-20">User not found.</p>;

  return (
    <PublicLayout>
      <section className="max-w-md mx-auto py-20">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Your Profile</h1>
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </section>
    </PublicLayout>
  );
}
