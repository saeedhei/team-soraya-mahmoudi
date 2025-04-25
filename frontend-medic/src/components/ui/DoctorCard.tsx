import React from "react";

type DoctorCardProps = {
  name: string;
  specialty: string;
  location: string;
  image: string;
};

const DoctorCard: React.FC<DoctorCardProps> = ({ name, specialty, location, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-sm w-full">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-blue-600 mt-1">{specialty}</p>
        <p className="text-gray-500 text-sm mt-1">{location}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;
