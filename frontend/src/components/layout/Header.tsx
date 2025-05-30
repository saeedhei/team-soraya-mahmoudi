import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () =>{
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Medic App
      </Link>
      <nav className="space-x-4 flex items-center">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ):(
          <>
           <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
           <Link to="/signup" className="text-gray-700 hover:text-blue-600">Signup</Link>
          </>
          
        )}
        
      </nav>
    </header>
  );
}