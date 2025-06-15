import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

interface RoleBasedRouteProps {
  allowedRoles: ("patient" | "doctor")[];
}

export default function RoleBasedRoute({ allowedRoles }: RoleBasedRouteProps) {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
