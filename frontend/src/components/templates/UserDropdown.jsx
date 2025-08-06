// frontend/src/components/templates/UserDropdown.jsx

import { useAuth } from '@/contexts/useAuth';
import { useNavigate } from 'react-router-dom';

export default function UserDropdown() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // Clear context & localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="relative group">
      <button className="text-blue-600 font-semibold">
        MyMarket ▼
      </button>
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md hidden group-hover:block z-50">
        <div className="px-4 py-2 text-sm text-gray-700 border-b">{user?.email}</div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
