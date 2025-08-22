import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContxt = createContext();

export function useAuth() {
  return useContext(AuthContxt);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const initializer = async (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, initializer);
    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    userLoggedIn,
  };
  return (
    <AuthContxt.Provider value={value}>
      {!loading && children}
    </AuthContxt.Provider>
  );
};
