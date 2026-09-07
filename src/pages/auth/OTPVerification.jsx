import { useState } from "react";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

function OTPVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile =
    location.state?.mobile ||
    localStorage.getItem("argi_mobile") ||
    "";

  const [otp, setOtp] = useState("");

  const verifyOTP = () => {
    if (otp === "123456") {
      localStorage.setItem("argi_logged_in", "true");
      navigate("/register");
    } else {
      alert("Invalid OTP. Use 123456.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <ShieldCheck size={42} />
        </div>

        <h1>Verify OTP</h1>

        <p>
          Enter the 6-digit OTP sent to
        </p>

        <strong>
          +91 {mobile}
        </strong>

        <input
          className="otp-input"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={otp}
          placeholder="Enter OTP"
          onChange={(e) =>
            setOtp(e.target.value.replace(/\D/g, ""))
          }
        />

        <div className="otp-demo">
          Demo OTP: <strong>123456</strong>
        </div>

        <button className="continue-button" onClick={verifyOTP}>
          Verify & Continue
          <ArrowRight size={19} />
        </button>

        <button
          className="text-button"
          onClick={() => navigate("/")}
        >
          ← Change mobile number
        </button>
      </div>
    </div>
  );
}

export default OTPVerification;