import Cookies from "js-cookie";

export const getAuthToken = () => {
  try {
    return Cookies.get("token") || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

export const logout = () => {
  try {
    Cookies.remove("token");
    Cookies.remove("userData");
    Cookies.remove("email");
    Cookies.remove("rememberMe");
    sessionStorage.removeItem("isPinVerified");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};