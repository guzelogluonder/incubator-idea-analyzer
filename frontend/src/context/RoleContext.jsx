import React, { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext(null);

const STORAGE_KEY = 'incubator-app-role';

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);

  // İlk yüklemede localStorage'dan rolü oku
  useEffect(() => {
    const storedRole = localStorage.getItem(STORAGE_KEY);
    if (storedRole === 'founder' || storedRole === 'mentor') {
      setRoleState(storedRole);
    }
  }, []);

  // Rolü güncelle ve localStorage'a yaz
  const setRole = (newRole) => {
    if (newRole === 'founder' || newRole === 'mentor') {
      setRoleState(newRole);
      localStorage.setItem(STORAGE_KEY, newRole);
    }
  };

  // Rolü sıfırla ve localStorage'dan temizle
  const clearRole = () => {
    setRoleState(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = {
    role,          // string | null
    setRole,       // (newRole: "founder" | "mentor") => void
    clearRole      // () => void
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

