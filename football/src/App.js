import Menu from "./components/Menu";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <div className="app">
      {/* <Home /> */}
      <Menu />

      <Register />
      <Login />
    </div>
  );
}

export default App;
