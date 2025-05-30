import React from "react";

const specialties = [
  { id: 1, name: "Cardiologist", icon: "🫀" },
  { id: 2, name: "Dermatologist", icon: "🧴" },
  { id: 3, name: "Pediatrician", icon: "👶" },
  { id: 4, name: "Psychiatrist", icon: "🧠" },
  { id: 5, name: "Dentist", icon: "🦷" },
  { id: 6, name: "Neurologist", icon: "🧬" },
  { id: 7, name: "Ophthalmologist", icon: "👁️" },
  { id: 8, name: "General Practitioner", icon: "🩺" },
];

const Specialties = () => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Explore by Specialties
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {specialties.map((spec) => (
            <div
              key={spec.id}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border hover:shadow-md transition duration-200 cursor-pointer"
            >
              <div className="text-4xl">{spec.icon}</div>
              <span className="mt-3 text-sm font-medium text-gray-700">
                {spec.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialties;