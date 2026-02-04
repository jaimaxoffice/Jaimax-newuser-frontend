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
  return !!getAuthToken();
};

export const getUserData = () => {
  try {
    const userData = Cookies.get("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const logout = () => {
  try {
    Cookies.remove("token");
    Cookies.remove("userData");
    Cookies.remove("email");
    Cookies.remove("rememberMe");
    sessionStorage.removeItem("isPinVerified");
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export const setAuthData = (token, userData) => {
  try {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("userData", JSON.stringify(userData), { expires: 7 });
  } catch (error) {
    console.error("Error setting auth data:", error);
  }
};