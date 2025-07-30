import React, { createContext, useState, useEffect, useContext } from "react";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie"; // ✅ Use js-cookie

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const secretKey = import.meta.env.VITE_ENCRYPT_SECRET_KEY;

    try {
      const encryptedData = Cookies.get("user_data"); // ✅ Reliable

      if (!encryptedData) {
        setToken(null);
        setIsAuth(false);
        return;
      }

      const parsed = JSON.parse(encryptedData);

      // ✅ Decrypt just the token field
      const bytes = CryptoJS.AES.decrypt(parsed.token, secretKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

      console.log("Decrypted token:", decryptedToken);

      if (!decryptedToken) {
        setToken(null);
        setIsAuth(false);
        return;
      }

      setToken(decryptedToken);
      setIsAuth(true);
    } catch (err) {
      console.error("AuthContext Error:", err);
      setToken(null);
      setIsAuth(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
