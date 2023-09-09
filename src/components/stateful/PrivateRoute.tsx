import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const user = useSelector((state: RootState) => state);
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRoute;
