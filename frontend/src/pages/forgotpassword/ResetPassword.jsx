import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

const ResetPassword = () => {
  const { token } = useParams(); // token from route
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      setLoading(true)
      const response = await axios.post(`/api/v1/user/verify-forgot-password`, {
        resetToken: token,
        newPassword: password
      })

      if (response?.data?.statusCode === 200) {
        navigate('/')
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleReset}
        className="w-full max-w-md  border border-cyan-300 p-6 rounded-md shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Reset Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="input input-bordered w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          className="input input-bordered w-full mb-4"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-accent w-full font-bold">
          {loading ? <Loader /> : " Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
