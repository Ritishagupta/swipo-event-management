import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState("email"); // "email" or "otp"
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // TODO: Call API to send OTP to the given email
    // For now, just move to OTP input
    if (email.trim()) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // TODO: Call API to verify OTP and redirect to reset password page
    console.log("Verify OTP:", otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md  shadow-md rounded-md p-6 border border-cyan-300">
        <h1 className="text-xl font-bold text-center mb-2">Forgot Password</h1>
        <p className="text-center text-gray-600 mb-4">
          {step === "email"
            ? "Enter your registered email to get OTP"
            : `OTP sent to: ${email}`}
        </p>

        {step === "email" ? (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn btn-accent w-full">
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="flex flex-col gap-3">
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              pattern="[0-9]*"
              minLength={6}
              maxLength={6}
              className="input input-bordered w-full"
              required
            />
            <button type="submit" className="btn btn-success w-full">
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
