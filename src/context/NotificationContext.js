import React, { useState } from 'react';

export const NotificationContext = React.createContext();

export const NotificationContextProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [style, setStyle] = useState('');
  const [itemId, setItemId] = useState('');

  const setNotification = (style, severity, message, itemId) => {
    setStyle(style);
    setMessage(message);
    setSeverity(severity);
    setItemId(itemId);

    if (style === 'confirm') return;
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const value = {
    notification: {
      message,
      severity,
    },
    style,
    itemId,
    setMessage,
    setNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
