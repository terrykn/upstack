import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../pages/Loading";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}