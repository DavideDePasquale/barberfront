import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // Se non c'è il token, reindirizza alla pagina di login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decodifica il token JWT (la parte centrale del JWT)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Sostituisci i caratteri per decodifica
    const decodedToken = JSON.parse(atob(base64)); // Decodifica la parte centrale e convertila in JSON

    const userRole = decodedToken.roles;

    // Se l'utente è un 'BARBER', reindirizza alla pagina delle prenotazioni del barbiere
    if (userRole === "BARBER") {
      return <Navigate to="/prenotazioni-barber" />;
    }

    // Se non è un 'BARBER', accedi alla pagina protetta
    return <Outlet />;
  } catch (error) {
    console.error("Errore nel decodificare il token", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
