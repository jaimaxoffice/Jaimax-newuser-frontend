import { Navigate, Outlet } from "react-router-dom";
import { useUserDataQuery } from "../../features/dashboard/dashboardApiSlice";

const CountryRoute = ({ countryCode }) => {
  const { data: userData, refetch } = useUserDataQuery(undefined, {});
  
  if (userData?.data?.countryCode !== 91) {
    return <Navigate to="/dashboard" replace />;
  }

  // Allow access to nested routes
  return <Outlet />;
};

export default CountryRoute;
