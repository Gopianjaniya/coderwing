import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { ToastContainer } from "react-toastify";
import CartPage from "./pages/CartPage.jsx";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cartpage" element={<CartPage/>}/>
      </Routes>
    </>
  );
}

export default App;
