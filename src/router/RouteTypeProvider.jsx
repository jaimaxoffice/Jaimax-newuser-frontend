// RouteTypeProvider.js
import React, { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

// Create a context for the route type
const RouteTypeContext = createContext();

export const useRouteType = () => {
  const context = useContext(RouteTypeContext);
  if (!context) {
    throw new Error("useRouteType must be used within a RouteTypeProvider");
  }
  return context;
};

const privateRoutePatterns = [
  /^\/dashboard/,
  /^\/wallet/,
  /^\/my-team/,
  /^\/shareholders/,
  /^\/earnings/,
  /^\/buy-history/,
  /^\/security/,
  /^\/profile/,
  /^\/jwallet/,
  /^\/kyc-information/,
  /^\/withdrawal/,
  /^\/support/,
  /^\/meetings/
];

const authPages = ["/login", "/register", "/forgot-password"];

const RouteTypeProvider = ({ children }) => {
  const location = useLocation();

  // Compute isPrivate and isAuthPage based on current path
  const contextValue = useMemo(() => {
    const currentPath = location.pathname;
    const isPrivate = privateRoutePatterns.some(pattern => pattern.test(currentPath));
    const isAuthPage = authPages.includes(currentPath);

    return {
      isPrivate,
      currentPath,
      isAuthPage
    };
  }, [location.pathname]);

  return (
    <RouteTypeContext.Provider value={contextValue}>
      {children}
    </RouteTypeContext.Provider>
  );
};

export default RouteTypeProvider;