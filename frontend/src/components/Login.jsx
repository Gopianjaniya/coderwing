import axios from "axios";
import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        backend + "/api/user/login",
        {
          email,
          password,
        },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          value={email}
          required
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-center mt-4">
          Don't have account?{" "}
          <Link to="/register" className="text-blue-500 font-medium">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
