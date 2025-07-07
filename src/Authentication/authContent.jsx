


import { createContext, useState,useEffect  } from "react";

export const MyContext = createContext("");
const ContextProvider = ({ children }) => {
  // const [data, setData] = useState([]);

  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem("userData");
      return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
      // console.error("Error parsing JSON from localStorage:", error);
      return null; // Handle gracefully if parsing fails
    }
  });
  
  useEffect(() => {
    // Save the data to localStorage whenever it changes
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));
    } else {
      localStorage.removeItem('userData');
    }
  }, [data]);

  const logout = () => {
    setData(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  return (
      <MyContext.Provider value={{ data, setData, logout }}>
        {children}
      </MyContext.Provider>
  );
};

export default ContextProvider;




