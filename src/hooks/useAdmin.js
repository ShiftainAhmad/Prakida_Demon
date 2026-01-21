import { useAuth } from "../context/AuthContext";

export const useAdmin = () => {
  const { user, loading } = useAuth();

  const ADMIN_EMAILS = ["prakrida@bitmesra.ac.in"];

  const isAdmin =
    user?.email && ADMIN_EMAILS.includes(user.email.toLowerCase());

  return {
    isAdmin: !!isAdmin,
    loading,
    user,
  };
};
