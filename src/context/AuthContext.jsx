import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const mapAuthError = (error) => {
  console.error("Auth Error:", error.code, error.message);
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please login instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/invalid-login-credentials":
      return "Invalid email or password.";
    case "auth/wrong-password":
      return "Invalid email or password."; // Security best practice: don't reveal which one
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    case "auth/popup-closed-by-user":
      return "Sign in was cancelled.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    default:
      return "Authentication failed. Please try again.";
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signUp = async (email, password, metadata = {}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      if (metadata.full_name) {
        await updateProfile(userCredential.user, {
          displayName: metadata.full_name,
        });
      }

      await sendEmailVerification(userCredential.user);

      return { data: userCredential.user, error: null };
    } catch (error) {
      return { error: { message: mapAuthError(error) } };
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      return { data: userCredential.user, error: null };
    } catch (error) {
      return { error: { message: mapAuthError(error) } };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { data: result.user, error: null };
    } catch (error) {
      return { error: { message: mapAuthError(error) } };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return { error: null };
    } catch (error) {
      return { error: { message: mapAuthError(error) } };
    }
  };

  const value = {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-black text-prakida-flame font-display text-2xl tracking-widest">
          INITIALIZING...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
