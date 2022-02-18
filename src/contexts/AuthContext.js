import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../loginEndpoint/FirebaseConfig';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    getRedirectResult(auth)
      .then((result) => {
        const user = result.user;
        console.log("user", user);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function signOut() {
    return auth.signOut();
  }


  function getUser() {
    return auth.currentUser
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if(user){
        const token = await user.getIdToken();
        setCurrentUser({
          user,
          token
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    })
    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    getUser,
    loginWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )

}