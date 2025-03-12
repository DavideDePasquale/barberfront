import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userRole = decodedToken.roles;

    // Se l'utente è un 'BARBER', reindirizza alla pagina delle prenotazioni del barbiere
    if (userRole === "BARBER") {
      return <Navigate to="/prenotazioni-barber" />;
    }

    // Altrimenti, accedi normalmente alla pagina protetta
    return <Outlet />;
  } catch (error) {
    console.error("Errore nel decodificare il token", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
