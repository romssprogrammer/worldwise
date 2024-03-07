import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthentification";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  //To understand what we have to return see what is return if the condition is true
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
