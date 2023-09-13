import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Prevents the user from accessing the route if there is no authentication
 */
function PrivateRoute() {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
