import { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader.jsx";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("/api/v1/user/forgot-password", { email });
      if (response?.data?.statusCode ===200) {
        setMessage("Reset password link has been sent to your email.");
      } else {
        setError("Failed to send reset link. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md shadow-md rounded-md p-6 border border-cyan-300">
        <h1 className="text-xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-4">
          Enter your registered email to receive a reset link.
        </p>

        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
            required
          />
          <button type="submit" className="btn btn-accent w-full" disabled={loading}>
            {loading ? <Loader/> : "Send Reset Link"}
          </button>
        </form>

        {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
