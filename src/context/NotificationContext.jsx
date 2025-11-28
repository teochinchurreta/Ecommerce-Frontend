import React, { createContext, useState, useCallback } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider({ children }){
  const [note, setNote] = useState(null); 

  const show = useCallback((type, message) => {
    setNote({ type, message });
    setTimeout(()=> setNote(null), 4200);
  }, []);

  return (
    <NotificationContext.Provider value={{ show }}>
      {children}
      {note && (
        <div style={{
          position:'fixed', right:16, top:16, zIndex:999,
          padding:'10px 14px', borderRadius:8,
          background: note.type === 'error' ? '#dc2626' : '#16a34a',
          color:'white', boxShadow:'0 6px 20px rgba(0,0,0,0.12)'
        }}>
          {note.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}
