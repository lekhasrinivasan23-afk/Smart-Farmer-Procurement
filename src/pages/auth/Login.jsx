import { useState } from "react";
import { Sprout, Phone, Copy, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import "../../App.css";

function Login() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [copied, setCopied] = useState(false);

  const text = {
    en: {
      title: "ArgiQueue",
      tagline: "Smart Crop Procurement & Queue Management",
      welcome: "Welcome Back 👋",
      subtitle: "Login using your mobile number",
      mobile: "Enter mobile number",
      otp: "Generate OTP",
      invalid: "Enter a valid 10-digit mobile number",
      demo: "Demo OTP",
      copy: "Copy OTP",
      copied: "Copied!",
      continue: "Continue to Registration",
    },
    ta: {
      title: "அர்ஜிக்யூ",
      tagline: "ஸ்மார்ட் பயிர் கொள்முதல் மற்றும் வரிசை மேலாண்மை",
      welcome: "மீண்டும் வரவேற்கிறோம் 👋",
      subtitle: "உங்கள் மொபைல் எண்ணைப் பயன்படுத்தி உள்நுழையவும்",
      mobile: "மொபைல் எண்ணை உள்ளிடவும்",
      otp: "OTP உருவாக்கவும்",
      invalid: "சரியான 10 இலக்க மொபைல் எண்ணை உள்ளிடவும்",
      demo: "டெமோ OTP",
      copy: "OTP நகலெடுக்க",
      copied: "நகலெடுக்கப்பட்டது!",
      continue: "பதிவுக்குத் தொடரவும்",
    },
    hi: {
      title: "अर्जीक्यू",
      tagline: "स्मार्ट फसल खरीद और कतार प्रबंधन",
      welcome: "वापसी पर स्वागत है 👋",
      subtitle: "अपने मोबाइल नंबर से लॉगिन करें",
      mobile: "मोबाइल नंबर दर्ज करें",
      otp: "OTP बनाएं",
      invalid: "सही 10 अंकों का मोबाइल नंबर दर्ज करें",
      demo: "डेमो OTP",
      copy: "OTP कॉपी करें",
      copied: "कॉपी हो गया!",
      continue: "पंजीकरण जारी रखें",
    },
  };

  const t = text[language];

  const handleGenerateOTP = () => {
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert(t.invalid);
      return;
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    setGeneratedOtp(otp);

    localStorage.setItem("argi_mobile", mobile);
    localStorage.setItem("argi_demo_otp", otp);
  };

  const copyOtp = async () => {
    await navigator.clipboard.writeText(generatedOtp);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const continueToRegistration = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="logo">
          <Sprout size={38} />
        </div>

        <h1>{t.title}</h1>

        <p className="tagline">
          {t.tagline}
        </p>

        <h2>{t.welcome}</h2>

        <p className="subtitle">
          {t.subtitle}
        </p>

        {/* Mobile */}
        <div className="input-box">

          <Phone size={20} />

          <input
            type="tel"
            placeholder={t.mobile}
            value={mobile}
            maxLength={10}
            onChange={(e) =>
              setMobile(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

        </div>

        {/* Generate OTP */}
        <button
          className="otp-button"
          onClick={handleGenerateOTP}
        >
          {t.otp}
        </button>

        {/* Generated OTP */}
        {generatedOtp && (
          <div className="demo-otp-box">

            <div className="demo-otp-label">
              🔐 {t.demo}
            </div>

            <div className="otp-display">

              <strong>{generatedOtp}</strong>

              <button
                type="button"
                onClick={copyOtp}
                className="copy-otp-button"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    {t.copy}
                  </>
                )}
              </button>

            </div>

            <button
              className="continue-demo-button"
              onClick={continueToRegistration}
            >
              {t.continue}
            </button>

          </div>
        )}

        <p className="register">

          New farmer?{" "}

          <Link
            to="/register"
            className="register-link"
          >
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;