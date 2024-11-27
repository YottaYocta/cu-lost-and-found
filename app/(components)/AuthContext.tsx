import { User, onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase";

const AuthContext = createContext<{ user: User | null } | null>(null);

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
