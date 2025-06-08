import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMe } from "@/hooks/useMe";

interface PatientLayoutProps {
    children: ReactNode;
  }

export default function PatientLayout({ children }: PatientLayoutProps) {
    const { user } = useMe();
    const { pathname } = useLocation();
  
    return (
    <div className="min-h-screen bg-gray-50 flex">
       {/* Sidebar */}
       <aside className="w-64 bg-blue-100 p-6 shadow-lg">
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-800">Patient Panel</h2>
          <p className="text-sm text-gray-600">{user?.username}</p>
        </div>

        <nav className="space-y-3">
          <SidebarLink to="/appointments" label="Appointments" current={pathname === "/appointments"} />
          <SidebarLink to="/profile" label="Profile" current={pathname === "/profile"} />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white p-10">{children}</main>
    </div>
  );
}

function SidebarLink({ to, label, current }: { to: string; label: string; current: boolean }) {
    return (
      <Link
        to={to}
        className={`block px-4 py-2 rounded-xl font-medium ${
          current ? "bg-blue-600 text-white" : "text-blue-800 hover:bg-blue-200"
        }`}
      >
        {label}
      </Link>
    );
  }