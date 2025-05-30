import { useState } from "react";

export default function SearchForm() {
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", specialty);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto flex gap-4">
      <input
        type="text"
        placeholder="Search by specialty or doctor name..."
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}