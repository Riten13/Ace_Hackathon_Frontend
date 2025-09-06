import {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
} from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// Creating Context
const AuthContext = createContext(null);

// Hook to consume the context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// AuthProvider Component that provides the auth context to all its children
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  // Function to set the state when user signs in or out
  async function initializeUser(user) {
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  // Value object to be passed in context
  const value = {
    userLoggedIn,
    currentUser,
    setCurrentUser,
  };

  return (
    // Context Provider
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
