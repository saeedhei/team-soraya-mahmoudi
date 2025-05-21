export function redirectToDashboard(role: "patient" | "doctor") {
    if (role === "doctor") {
      return "/doctor-dashboard";
    }
    return "/patient-dashboard";
  }
  