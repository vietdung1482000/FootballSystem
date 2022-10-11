import Menu from "./components/Menu";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from './pages/HomePage/HomePage';
import LandingPage from "./pages/LandingPage/LandingPage";
import DetailPage from './pages/Detail/Detail'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SelectModule from "./components/SelectModule";
import RegisterBusiness from "./pages/Register/RegisterBusiness";

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }

    return children
  };

  return (
    <div className="app">

      <BrowserRouter>
        <Menu />
        {/* <LandingPage /> */}
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="detail" element={<DetailPage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="selectModule" element={<SelectModule />} />
            <Route path="resbusiness" element={<RegisterBusiness />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
