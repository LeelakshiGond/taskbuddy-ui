import Header from "./components/header/Header";
import { ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import theme from "./components/themeData/theme";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            userLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/home" element={<Header />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
