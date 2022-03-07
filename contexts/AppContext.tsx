import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { app } from "../firebase/clientApp";

type UserProfile = {
  email: string;
  userId: string;
  displayName?: string;
};

type User = {
  result: UserProfile;
};

type UserContext = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  auth: any;
  app: any;
  firebaseUser: any;
};

export const AppContext = React.createContext<UserContext | null>(null);

export const AppContextProvider = ({ children }) => {
  const firebase = app;
  const [user, setUser] = useState<User>(undefined);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Make sure user has verified their email
        if (user.emailVerified) {
          setUser({
            result: {
              email: user.email,
              userId: user.uid,
              displayName: user.displayName,
            },
          });
          setFirebaseUser(user);
          setLoading(false);
        }
        setLoading(false);
      } else {
        setUser(null);
        setFirebaseUser(null);
        setLoading(false);
      }
    });
  }, [auth]);

  if (!loading) {
    return (
      <AppContext.Provider value={{ user, setUser, auth, app, firebaseUser }}>
        {children}
      </AppContext.Provider>
    );
  } else {
    return null;
  }
};
