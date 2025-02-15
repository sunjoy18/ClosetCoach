import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import StartPage from "./components/StartPage";
import SignUp from "./components/Auth/SignUp";
import LoginPage from "./components/Auth/LoginPage";
import Home from "./components/Home";
import StyleProfileForm from "./components/StyleProfileForm";
import PrivateRoute from "./PrivateRoute";
import NotFound404 from "./components/404Page";
import Navbar from "./components/Navbar";
import Recommend from "./components/Recommend";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <AppContent token={token} setToken={setToken} />
    </Router>
  );
}

// New component to get the current route and conditionally render the Navbar
function AppContent({ token, setToken }) {
  const location = useLocation();
  // The routes where the navbar will be hidden
  const hideNavbarPaths = ["/", "/login", "/sign"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar token={token} setToken={setToken} />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <StartPage />}
        />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Private Routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/recommend" element={<PrivateRoute element={<Recommend />} />} />
        <Route
          path="/form"
          element={<PrivateRoute element={<StyleProfileForm />} />}
        />
        <Route path="/404" element={<NotFound404 />} />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to={token ? "/404" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;
