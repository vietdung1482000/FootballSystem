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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MenuHeader from "./components/MenuHeader";
import { CssBaseline } from "@mui/material";
import "./App.css";

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
      <PayPalScriptProvider
        options={{ "client-id": 'AX_hA27L2deyQ_ejBbJ3XoU-feZ6_I3-gkjgm_7wuSWQYp1HmQVC-bNCLrprUn88PaXAxTCOwjKRwy7i' }}
      >
        <BrowserRouter>
        <CssBaseline />
          <MenuHeader />
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="selectModule" element={<SelectModule />} />
            <Route path="resbusiness" element={<RegisterBusiness />} />
            <Route path="match" element={<LandingPage />} />
            <Route path="detail/:business_id" element={<DetailPage />} />
            <Route path="chat">
              <Route index element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
            </Route>
            <Route path="calender/:business_id" element={<Calender />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </PayPalScriptProvider>


    </div>
  );
}

export default App;
