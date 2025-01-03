import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from '../utils/auth';

interface UserContextType {
  user: User | null;
  loading: boolean;
  role: string;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  role: 'user',
  isAdmin: false
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState('user');
  
  useEffect(() => {
    // Future log: Auth state change subscription
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch user role from backend
        try {
          const response = await fetch('/api/users/profile');
          const userData = await response.json();
          setRole(userData.role || 'user');
        } catch (error) {
          // Future log: Role fetch failed
          setRole('user');
        }
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      loading,
      role,
      isAdmin: role === 'admin'
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext); 