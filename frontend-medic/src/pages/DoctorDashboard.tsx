import React, {useState, useEffect} from "react";
import {useAuth} from "@/contexts/AuthContext";
import {gql, useQuery} from "@apollo/client";

const GET_DOCTOR_APPOINTMENTS= gql`
  query GetDoctorAppointments($doctorId: ID!){
    getAppointmentsForDoctor(doctorId: $doctorId){
        id
        patientName
        specialty
        date
        status
    }
  }
`;

export default function DoctorDashboard(){
    const {user}= useAuth();
    const {loading, error, data}= useQuery(GET_DOCTOR_APPOINTMENTS,{
        variables: {doctorId: user?.id},
    });
    const handleConfirmAppointment=(appointmentId:string)=>{
        console.log('Confirming appointment', appointmentId);
    };
    if(loading) return <p>Loading... </p>;
    if(error) return <p> Error: {error.message}</p>;

    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, Dr. {user?.name}</h1>
            <h2 className="mt-4 text-lg">Your Appointments</h2>
            <div className="mt-6">
                {data?.getAppointmentsForDoctor.length ===0?(
                    <p>No appointments pending.</p>
                ):(
                    <ul>
                        {data.getAppointmentsForDoctor.map((appointment:any)=>(
                           <li key={appointment.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <p className="text-xl font-semibold">{appointment.patientName}</p>
                            <p className="text-gray-600">{appointment.specialty}</p>
                            <p className="text-gray-500">Date: {appointment.date}</p>
                            <p className={`text-sm mt-2 ${appointment.status === 'confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                            Status: {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                            </p>
                            <button 
                              onClick={() => handleConfirmAppointment(appointment.id)}
                              className="mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Confirm Appointment
                            </button>
                           </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}