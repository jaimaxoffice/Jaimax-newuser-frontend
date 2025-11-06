// contexts/NotificationContext.jsx
import React, { createContext, useContext } from 'react';
import { useNotification } from '../Hooks/useNotification';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notification = useNotification();

  return (
    <NotificationContext.Provider value={notification}>
      {children}
      
      {/* Notification Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notification.notifications.map(notif => (
          <div
            key={notif.id}
            className={`p-4 rounded-lg shadow-lg animate-slideIn ${
              notif.type === 'success' ? 'bg-green-500' :
              notif.type === 'error' ? 'bg-red-500' :
              notif.type === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            } text-white`}
          >
            <div className="flex items-center justify-between">
              <p>{notif.message}</p>
              <button
                onClick={() => notification.removeNotification(notif.id)}
                className="ml-4 text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotify must be used within NotificationProvider');
  }
  return context;
};