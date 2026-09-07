import {
  Sprout,
  MapPin,
  CalendarCheck,
  Clock3,
  ArrowRight,
  ShieldCheck,
  Tractor,
  Wheat,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "../App.css";

function Home() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();

  const text = {
    en: {
      brand: "ArgiQueue",
      tagline: "Smart Crop Procurement & Queue Management",
      heading: "Sell your crops.",
      heading2: "Skip the queue.",
      description:
        "Book your procurement slot, track your queue and manage your crop sale easily — all in one place.",
      login: "Login",
      create: "Create Account",
      features: "Everything you need",
      centre: "Find Nearby Centres",
      centreText: "Discover procurement centres near you.",
      booking: "Book Your Slot",
      bookingText: "Choose a convenient date and time.",
      queue: "Track Your Queue",
      queueText: "Know your waiting time in real time.",
      secure: "Simple • Secure • Farmer Friendly",
    },

    ta: {
      brand: "அர்ஜிக்யூ",
      tagline: "ஸ்மார்ட் பயிர் கொள்முதல் மற்றும் வரிசை மேலாண்மை",
      heading: "உங்கள் பயிர்களை விற்கவும்.",
      heading2: "வரிசையை தவிர்க்கவும்.",
      description:
        "கொள்முதல் நேரத்தை முன்பதிவு செய்து, வரிசையை கண்காணித்து, உங்கள் பயிர் விற்பனையை எளிதாக நிர்வகிக்கவும்.",
      login: "உள்நுழை",
      create: "கணக்கை உருவாக்கு",
      features: "உங்களுக்கு தேவையான அனைத்தும்",
      centre: "அருகிலுள்ள மையங்களை கண்டறியுங்கள்",
      centreText:
        "உங்களுக்கு அருகிலுள்ள கொள்முதல் மையங்களை கண்டறியுங்கள்.",
      booking: "நேரத்தை முன்பதிவு செய்யுங்கள்",
      bookingText:
        "உங்களுக்கு ஏற்ற தேதி மற்றும் நேரத்தை தேர்வு செய்யுங்கள்.",
      queue: "வரிசையை கண்காணிக்கவும்",
      queueText:
        "உங்கள் காத்திருப்பு நேரத்தை நேரடியாக அறியுங்கள்.",
      secure: "எளிமையானது • பாதுகாப்பானது • விவசாயிகளுக்கு ஏற்றது",
    },

    hi: {
      brand: "अर्जीक्यू",
      tagline: "स्मार्ट फसल खरीद और कतार प्रबंधन",
      heading: "अपनी फसल बेचें।",
      heading2: "कतार से बचें।",
      description:
        "अपना खरीद स्लॉट बुक करें, कतार को ट्रैक करें और अपनी फसल बिक्री को आसानी से प्रबंधित करें।",
      login: "लॉगिन",
      create: "खाता बनाएं",
      features: "आपके लिए आवश्यक सुविधाएं",
      centre: "नजदीकी केंद्र खोजें",
      centreText: "अपने पास के खरीद केंद्र खोजें।",
      booking: "अपना स्लॉट बुक करें",
      bookingText: "सुविधाजनक तारीख और समय चुनें।",
      queue: "अपनी कतार ट्रैक करें",
      queueText: "अपना प्रतीक्षा समय लाइव देखें।",
      secure: "सरल • सुरक्षित • किसान अनुकूल",
    },
  };

  const t = text[language] || text.en;

  return (
    <div className="simple-home">

      {/* ================= HEADER ================= */}

      <header className="simple-home-header">

        <div className="brand">

          <div className="brand-icon">
            <Sprout size={32} strokeWidth={2} />
          </div>

          <div className="brand-text">
            <h2>{t.brand}</h2>
            <span>Smart Farmer Platform</span>
          </div>

        </div>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="home-lang-select"
        >
          <option value="en">🇬🇧 English</option>
          <option value="ta">🇮🇳 தமிழ்</option>
          <option value="hi">🇮🇳 हिन्दी</option>
        </select>

      </header>

      {/* ================= MAIN ================= */}

      <main className="simple-home-main">

        {/* ================= HERO ================= */}

        <section className="simple-hero">

          <div className="hero-left">

            <div className="small-badge">
              🌾 SMART FARMER PLATFORM
            </div>

            <h1>
              {t.heading}
              <br />
              <span>{t.heading2}</span>
            </h1>

            <p className="simple-tagline">
              🚜 {t.tagline}
            </p>

            <p className="simple-description">
              {t.description}
            </p>

            {/* BUTTONS */}

            <div className="simple-buttons">

              <button
                className="simple-primary"
                onClick={() => navigate("/login")}
              >
                🌱 {t.create}
                <ArrowRight size={20} />
              </button>

              <button
                className="simple-secondary"
                onClick={() => navigate("/login")}
              >
                👨‍🌾 {t.login}
              </button>

            </div>

            {/* TRUST */}

            <div className="simple-trust">
              <ShieldCheck size={19} />
              <span>{t.secure}</span>
            </div>

            {/* MINI HIGHLIGHTS */}

            <div className="hero-highlights">

              <div className="hero-highlight">
                <span>🌾</span>
                <div>
                  <strong>Easy</strong>
                  <small>Crop Selling</small>
                </div>
              </div>

              <div className="hero-highlight">
                <span>⏱️</span>
                <div>
                  <strong>Live</strong>
                  <small>Queue Updates</small>
                </div>
              </div>

              <div className="hero-highlight">
                <span>📍</span>
                <div>
                  <strong>Nearby</strong>
                  <small>Centres</small>
                </div>
              </div>

            </div>

          </div>

          {/* ================= VISUAL ================= */}

          <div className="simple-visual">

            <div className="sun-decoration">☀️</div>
            <div className="cloud-decoration cloud-one">☁️</div>
            <div className="cloud-decoration cloud-two">☁️</div>

            <div className="visual-orbit"></div>

            <div className="crop-circle">

              <div className="crop-emoji">
                🌾
              </div>

              <Sprout
                size={90}
                strokeWidth={1.5}
              />

            </div>

            {/* FARM EMOJIS */}

            <div className="floating-emoji emoji-one">🌱</div>
            <div className="floating-emoji emoji-two">🌻</div>
            <div className="floating-emoji emoji-three">🚜</div>
            <div className="floating-emoji emoji-four">🌾</div>

            {/* LOCATION CARD */}

            <div className="visual-card">

              <div className="visual-icon">
                <MapPin size={24} />
              </div>

              <div>
                <strong>
                  📍 {t.centre}
                </strong>

                <span>
                  {t.centreText}
                </span>
              </div>

              <CheckCircle2
                className="card-check"
                size={20}
              />

            </div>

          </div>

        </section>

        {/* ================= FEATURES ================= */}

        <section className="simple-features">

          <div className="features-heading">

            <div className="section-kicker">
              ✨ SIMPLE & SMART
            </div>

            <h2>{t.features}</h2>

            <p>
              Everything a farmer needs to make crop selling easier.
            </p>

          </div>

          <div className="feature-grid">

            {/* CARD 1 */}

            <div className="simple-feature-card centre-card">

              <div className="simple-feature-icon">
                <MapPin size={27} />
              </div>

              <div className="feature-content">

                <div className="feature-emoji">
                  📍
                </div>

                <h3>{t.centre}</h3>

                <p>{t.centreText}</p>

                <div className="feature-line">
                  <span>Nearby</span>
                  <span>Easy</span>
                </div>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="simple-feature-card booking-card">

              <div className="simple-feature-icon">
                <CalendarCheck size={27} />
              </div>

              <div className="feature-content">

                <div className="feature-emoji">
                  📅
                </div>

                <h3>{t.booking}</h3>

                <p>{t.bookingText}</p>

                <div className="feature-line">
                  <span>Flexible</span>
                  <span>Quick</span>
                </div>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="simple-feature-card queue-card">

              <div className="simple-feature-icon">
                <Clock3 size={27} />
              </div>

              <div className="feature-content">

                <div className="feature-emoji">
                  ⏱️
                </div>

                <h3>{t.queue}</h3>

                <p>{t.queueText}</p>

                <div className="feature-line">
                  <span>Live</span>
                  <span>Real-time</span>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ================= BOTTOM BANNER ================= */}

        <section className="farmer-banner">

          <div className="banner-left">

            <div className="banner-icon">
              👨‍🌾
            </div>

            <div>
              <h3>🌱 Smarter farming starts here</h3>
              <p>
                Save time. Avoid long queues. Sell your crops with ease.
              </p>
            </div>

          </div>

          <div className="banner-icons">
            🌾 🚜 🌱
          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer className="simple-home-footer">

        <Sprout size={18} />

        <span>
          {t.brand} © 2026 • Smart Farmer Platform 🌾
        </span>

      </footer>

    </div>
  );
}

export default Home;