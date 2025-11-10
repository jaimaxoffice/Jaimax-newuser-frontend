import { useCallback, useRef } from "react";

export const useNotification = () => {
  const activeNotificationsRef = useRef([]);

  const showNotification = useCallback((type, message, duration = 3000) => {
    if (activeNotificationsRef.current.length > 2) {
      const oldest = activeNotificationsRef.current.shift();
      if (oldest && oldest.parentNode) {
        oldest.remove();
      }
    }
    const container = document.createElement("div");
    container.textContent = message;
    const topPosition = 20 + (activeNotificationsRef.current.length * 70);
    container.className = `
      fixed right-5 z-[9999] px-4 py-3 rounded-lg shadow-lg text-white
      transition-all duration-300 min-w-[250px] max-w-[400px]
      ${type === "success" 
        ? "bg-green-600" 
        : type === "warning"
        ? "bg-yellow-500"
        : type === "info"
        ? "bg-blue-600"
        : "bg-red-600"}
    `;
    
    container.style.cssText = `
      top: ${topPosition}px;
      opacity: 0;
      transform: translateX(100%);
    `;
    const icon = document.createElement("span");
    icon.style.marginRight = "8px";
    icon.innerHTML = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
    container.prepend(icon);
    
    document.body.appendChild(container);
    activeNotificationsRef.current.push(container);
    requestAnimationFrame(() => {
      container.style.opacity = "1";
      container.style.transform = "translateX(0)";
    });

    const timeoutId = setTimeout(() => {
      container.style.opacity = "0";
      container.style.transform = "translateX(100%)";
      
      setTimeout(() => {
        const index = activeNotificationsRef.current.indexOf(container);
        if (index > -1) {
          activeNotificationsRef.current.splice(index, 1);
        }
        container.remove();
        activeNotificationsRef.current.forEach((notif, idx) => {
          notif.style.top = `${20 + (idx * 70)}px`;
        });
      }, 300);
    }, duration);
    container.style.cursor = "pointer";
    container.onclick = () => {
      clearTimeout(timeoutId);
      container.style.opacity = "0";
      container.style.transform = "translateX(100%)";
      setTimeout(() => {
        const index = activeNotificationsRef.current.indexOf(container);
        if (index > -1) {
          activeNotificationsRef.current.splice(index, 1);
        }
        container.remove();
        
        activeNotificationsRef.current.forEach((notif, idx) => {
          notif.style.top = `${20 + (idx * 70)}px`;
        });
      }, 300);
    };
  }, []);

  const clearAllNotifications = useCallback(() => {
    activeNotificationsRef.current.forEach(container => {
      container.remove();
    });
    activeNotificationsRef.current = [];
  }, []);

  return { showNotification, clearAllNotifications };
};