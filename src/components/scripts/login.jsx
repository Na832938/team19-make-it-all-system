// src/hooks/useLogout.jsx
import { useNavigate } from "react-router-dom";

export default function useLogout() {
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    navigate("/");
  };
}
