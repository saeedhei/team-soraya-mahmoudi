import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/useAuth';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Medic App
      </Link>
      <nav className="relative">
        {user ? (
          <div className="relative inline-block text-left " ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="w-fit flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200 transition"
              aria-haspopup="true"
              aria-expanded={isMenuOpen}
              aria-label="Toggle user menu"
            >
              <span className="text-sm text-gray-700 font-medium">Hi, {user.name}</span>
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="ml-2 text-lg text-gray-500">{isMenuOpen ? '▲' : '▼'}</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Edit Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-gray-700 hover:text-blue-600">
              Signup
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
