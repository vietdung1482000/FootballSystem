import Menu from "./components/Menu";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import HomePage from './pages/HomePage/HomePage';
import LandingPage from "./pages/LandingPage/LandingPage";
import DetailPage from './pages/Detail/Detail'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import SelectModule from "./components/SelectModule";
import RegisterBusiness from "./pages/Register/RegisterBusiness";
import Footer from "./components/Footer";
import Calender from "./pages/Calender/Calender";
import moment from 'moment';

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
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="selectModule" element={<SelectModule />} />
          <Route path="resbusiness" element={<RegisterBusiness />} />
          <Route path="match" element={<LandingPage />} />
          <Route path="detail" element={<DetailPage />} />
          <Route path="chat">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          </Route>
          <Route path="/year/:year/month/:month" element={<Calender />} />
          <Route path="calender" element={<Calender />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
