import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        navigate("/");
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
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <input
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Name"
          id="name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="email"
          id="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/" className="text-green-500 font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
