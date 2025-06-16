import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && new Date().getTime() < auth.expirationTime) {
      navigate("/dashboard/home");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "vintagecraft@gmail.com" && password === "123456") {
      const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
      localStorage.setItem("auth", JSON.stringify({ email, expirationTime }));
      navigate("/dashboard/home");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="bg-white px-8 rounded-lg shadow-lg w-96 max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            My Vintage Craft
        </h2>
        <h3 className="text-xl text-center text-gray-600 mb-6">Login to Your Account</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
