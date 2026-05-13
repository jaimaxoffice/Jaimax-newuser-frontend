// src/context/SocketProvider.jsx
import { createContext, useContext, useEffect, useRef } from "react";
import { createSocket } from "../components/Dashboard/pages/Community/socket/socketConfig.js";
import { useUnread } from "./UnreadContext.jsx";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

const SocketContext = createContext(null);

const parseCurrentUser = () => {
  try {
    const raw = Cookies.get("userData");
    if (!raw) return { id: "", name: "" };
    const parsed = JSON.parse(raw);
    const data = parsed?.data || parsed || {};
    return {
      id: data.username || data.userId || data.id || "",
      name: data.name || "",
    };
  } catch {
    return { id: "", name: "" };
  }
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const { setUnread } = useUnread();
  const currentUser = parseCurrentUser();
  const socketUrl = import.meta.env.VITE_API_CHAT_URL;
  const location = useLocation();

  const isChatOpen = location.pathname === "/community";

  useEffect(() => {
    if (!currentUser.id) return;

    const socket = createSocket({ socketUrl, currentUser, type: "provider" });
    socketRef.current = socket;


    console.log(isChatOpen, "isChatOpenqwe")




    socket.emit("get_unread_count", {
      chatId: "JAIMAXedb6df9e-52e0-4cfe-8723-83d33a58f9f0",
      userId: "JAIMAX874ZICP"
    });

    socket.on("unread_count_update", ({ chatId, unreadCount }) => {
      console.log(chatId, unreadCount, "unreadCountw12e34");
      if (!isChatOpen) { // ← only update unread count when user is NOT on community page
        setUnread((prev) => ({ ...prev, [chatId]: unreadCount }));
      }
    });

    socket.on("unread_reset", ({ chatId }) => {
      console.log("unread_reset received in community:", chatId);
      setUnread((prev) => ({ ...prev, [chatId]: 0 }));
    });


    return () => {
      // socket.removeAllListeners();
      // socket.disconnect();
      socketRef.current = null;
    };
  }, [currentUser.id]);

  return (
    <SocketContext.Provider value={{ socketRef }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useGlobalSocket = () => useContext(SocketContext);