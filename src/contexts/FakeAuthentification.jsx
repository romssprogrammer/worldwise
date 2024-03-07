import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
// What are the datas ?
const initialeState = { user: null, isAuthenticated: false };

const FAKE_USER = {
  name: "romain",
  email: "romain@example.com",
  password: "rom",
  avatar: "public/me.jpg",
};

function reducer(state, action) {
  // Quel est le type d'action que l'on veut définir
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknow action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialeState
  );

  function login(email, password) {
    // Is the email and password match the user data
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  // What information we want to provide in value props?
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  // Here i suppose developper say i want to use the context that we create
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
