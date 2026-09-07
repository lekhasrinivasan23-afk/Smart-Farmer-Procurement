import { useState } from "react";
import {
  UserRound,
  Phone,
  MapPin,
  Hash,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import VoiceAssistant from "../../components/VoiceAssistant";
import "../../App.css";

// ===============================
// DEMO LOCATION DATA
// ===============================

const locationData = {
  "Tamil Nadu": {
    Chennai: ["Ambattur", "Avadi", "Madhuravoyal"],
    Coimbatore: ["Pollachi", "Sulur", "Annur"],
    Madurai: ["Melur", "Usilampatti", "Thirumangalam"],
    Salem: ["Attur", "Mettur", "Edappadi"],
    Tiruchirappalli: [
      "Manachanallur",
      "Lalgudi",
      "Thuraiyur",
    ],
  },

  Maharashtra: {
    Mumbai: ["Andheri", "Borivali", "Kurla"],
    Pune: ["Haveli", "Mulshi", "Baramati"],
    Nagpur: ["Hingna", "Kamptee", "Umred"],
    Nashik: ["Sinnar", "Igatpuri", "Niphad"],
    Aurangabad: ["Paithan", "Kannad", "Gangapur"],
  },

  Delhi: {
    "Central Delhi": [
      "Karol Bagh",
      "Paharganj",
      "Daryaganj",
    ],
    "East Delhi": [
      "Ghazipur",
      "Mayur Vihar",
      "Preet Vihar",
    ],
    "New Delhi": [
      "Chanakyapuri",
      "Vasant Vihar",
      "Sarojini Nagar",
    ],
    "North Delhi": [
      "Alipur",
      "Narela",
      "Burari",
    ],
    "South Delhi": [
      "Mehrauli",
      "Saket",
      "Chhatarpur",
    ],
  },

  "Uttar Pradesh": {
    Lucknow: ["Malihabad", "Mohan", "Kakori"],
    "Kanpur Nagar": [
      "Bilhaur",
      "Ghatampur",
      "Kalyanpur",
    ],
    Agra: [
      "Fatehabad",
      "Kheragarh",
      "Etmadpur",
    ],
    Varanasi: [
      "Pindra",
      "Sewapuri",
      "Kashi Vidyapeeth",
    ],
    Prayagraj: [
      "Koraon",
      "Meja",
      "Phulpur",
    ],
  },

  "Madhya Pradesh": {
    Bhopal: ["Berasia", "Phanda", "Ratibad"],
    Indore: ["Depalpur", "Mhow", "Sanwer"],
    Jabalpur: ["Patan", "Panagar", "Shahpura"],
    Gwalior: ["Morar", "Dabra", "Bhitarwar"],
    Ujjain: ["Nagda", "Mahidpur", "Tarana"],
  },
};

function Register() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    aadhaar: "",
    state: "",
    district: "",
    village: "",
    khasra: "",
  });

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ===============================
  // LANGUAGE TEXT
  // ===============================

  const text = {
    en: {
      title: "Farmer Registration",
      subtitle:
        "Register your details to use ArgiQueue",

      name: "Farmer Name",
      namePlaceholder: "Enter your name",

      aadhaar: "Aadhaar Number",
      aadhaarPlaceholder:
        "Enter 12-digit Aadhaar number",

      state: "State",
      statePlaceholder: "Select your state",

      district: "District",
      districtPlaceholder:
        "Select your district",

      village: "Village / Panchayat",
      villagePlaceholder:
        "Select village or panchayat",

      khasra: "Khasra / Survey Number",
      khasraPlaceholder:
        "Enter survey number",

      selectState: "Select State",
      selectDistrict: "Select District",
      selectVillage:
        "Select Village / Panchayat",

      error: "Please fill all fields.",
      aadhaarError:
        "Aadhaar number must contain 12 digits.",

      continue:
        "Continue to Crop Details",
    },

    ta: {
      title: "விவசாயி பதிவு",
      subtitle:
        "ArgiQueue பயன்படுத்த உங்கள் விவரங்களை பதிவு செய்யவும்",

      name: "விவசாயியின் பெயர்",
      namePlaceholder:
        "உங்கள் பெயரை உள்ளிடவும்",

      aadhaar: "ஆதார் எண்",
      aadhaarPlaceholder:
        "12 இலக்க ஆதார் எண்ணை உள்ளிடவும்",

      state: "மாநிலம்",
      statePlaceholder:
        "உங்கள் மாநிலத்தை தேர்வு செய்யவும்",

      district: "மாவட்டம்",
      districtPlaceholder:
        "உங்கள் மாவட்டத்தை தேர்வு செய்யவும்",

      village: "கிராமம் / பஞ்சாயத்து",
      villagePlaceholder:
        "கிராமம் அல்லது பஞ்சாயத்தை தேர்வு செய்யவும்",

      khasra: "கஸ்ரா / சர்வே எண்",
      khasraPlaceholder:
        "சர்வே எண்ணை உள்ளிடவும்",

      selectState: "மாநிலத்தை தேர்வு செய்யவும்",
      selectDistrict:
        "மாவட்டத்தை தேர்வு செய்யவும்",
      selectVillage:
        "கிராமம் / பஞ்சாயத்தை தேர்வு செய்யவும்",

      error:
        "அனைத்து விவரங்களையும் நிரப்பவும்.",
      aadhaarError:
        "ஆதார் எண்ணில் 12 இலக்கங்கள் இருக்க வேண்டும்.",

      continue:
        "பயிர் விவரங்களுக்கு தொடரவும்",
    },

    hi: {
      title: "किसान पंजीकरण",
      subtitle:
        "ArgiQueue का उपयोग करने के लिए अपनी जानकारी दर्ज करें",

      name: "किसान का नाम",
      namePlaceholder:
        "अपना नाम दर्ज करें",

      aadhaar: "आधार नंबर",
      aadhaarPlaceholder:
        "12 अंकों का आधार नंबर दर्ज करें",

      state: "राज्य",
      statePlaceholder:
        "अपना राज्य चुनें",

      district: "जिला",
      districtPlaceholder:
        "अपना जिला चुनें",

      village: "गांव / पंचायत",
      villagePlaceholder:
        "गांव या पंचायत चुनें",

      khasra: "खसरा / सर्वे नंबर",
      khasraPlaceholder:
        "सर्वे नंबर दर्ज करें",

      selectState: "राज्य चुनें",
      selectDistrict: "जिला चुनें",
      selectVillage:
        "गांव / पंचायत चुनें",

      error:
        "कृपया सभी जानकारी भरें।",

      aadhaarError:
        "आधार नंबर में 12 अंक होने चाहिए।",

      continue:
        "फसल विवरण पर जाएं",
    },
  };

  const t = text[language] || text.en;

  // ===============================
  // VOICE FIELDS
  // ===============================

  const voiceFields = [
    {
      key: "name",
      questionIndex: 0,

      setValue: (value) => {
        update("name", value);
      },
    },

    {
      key: "aadhaar",
      questionIndex: 1,

      setValue: (value) => {
        update(
          "aadhaar",
          value
            .replace(/\D/g, "")
            .slice(0, 12)
        );
      },
    },

    // STATE
    {
      key: "state",
      questionIndex: 2,

      setValue: (value) => {
        const spoken = value
          .trim()
          .toLowerCase();

        const matchedState =
          Object.keys(locationData).find(
            (state) =>
              state.toLowerCase() === spoken
          ) ||
          Object.keys(locationData).find(
            (state) =>
              spoken.includes(
                state.toLowerCase()
              ) ||
              state
                .toLowerCase()
                .includes(spoken)
          );

        if (matchedState) {
          update("state", matchedState);
          update("district", "");
          update("village", "");
        }
      },
    },

    // DISTRICT
    {
      key: "district",
      questionIndex: 3,

      setValue: (value) => {
        const spoken = value
          .trim()
          .toLowerCase();

        if (!form.state) return;

        const districts = Object.keys(
          locationData[form.state]
        );

        const matchedDistrict =
          districts.find(
            (district) =>
              district.toLowerCase() === spoken
          ) ||
          districts.find(
            (district) =>
              spoken.includes(
                district.toLowerCase()
              ) ||
              district
                .toLowerCase()
                .includes(spoken)
          );

        if (matchedDistrict) {
          update(
            "district",
            matchedDistrict
          );
          update("village", "");
        }
      },
    },

    // VILLAGE
    {
      key: "village",
      questionIndex: 4,

      setValue: (value) => {
        const spoken = value
          .trim()
          .toLowerCase();

        if (!form.state || !form.district)
          return;

        const villages =
          locationData[form.state][
            form.district
          ];

        const matchedVillage =
          villages.find(
            (village) =>
              village.toLowerCase() ===
              spoken
          ) ||
          villages.find(
            (village) =>
              spoken.includes(
                village.toLowerCase()
              ) ||
              village
                .toLowerCase()
                .includes(spoken)
          );

        if (matchedVillage) {
          update(
            "village",
            matchedVillage
          );
        }
      },
    },

    // KHASRA
    {
      key: "khasra",
      questionIndex: 5,

      setValue: (value) => {
        update("khasra", value);
      },
    },
  ];

  // ===============================
  // SUBMIT
  // ===============================

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.aadhaar.trim() ||
      !form.state.trim() ||
      !form.district.trim() ||
      !form.village.trim() ||
      !form.khasra.trim()
    ) {
      alert(t.error);
      return;
    }

    if (!/^\d{12}$/.test(form.aadhaar)) {
      alert(t.aadhaarError);
      return;
    }

    const registrationNumber =
      "AGQ-" +
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    const mobile =
      localStorage.getItem(
        "argi_mobile"
      ) || "";

    const farmerData = {
      name: form.name,
      aadhaar: form.aadhaar,
      state: form.state,
      district: form.district,
      village: form.village,
      khasra: form.khasra,
      mobile: mobile,
      registrationNumber:
        registrationNumber,
    };

    localStorage.setItem(
      "argi_farmer",
      JSON.stringify(farmerData)
    );

    navigate("/crop-details");
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="form-page">
      <div className="form-card">

        {/* HEADING */}

        <div className="page-heading">
          <div className="page-icon">
            <UserRound size={30} />
          </div>

          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        <form onSubmit={submit}>

          {/* NAME */}

          <div className="form-group">
            <label>{t.name}</label>

            <div className="input-with-icon">
              <UserRound size={18} />

              <input
                type="text"
                value={form.name}
                placeholder={
                  t.namePlaceholder
                }
                onChange={(e) =>
                  update(
                    "name",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* AADHAAR */}

          <div className="form-group">
            <label>{t.aadhaar}</label>

            <div className="input-with-icon">
              <Phone size={18} />

              <input
                type="tel"
                inputMode="numeric"
                maxLength={12}
                value={form.aadhaar}
                placeholder={
                  t.aadhaarPlaceholder
                }
                onChange={(e) =>
                  update(
                    "aadhaar",
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 12)
                  )
                }
              />
            </div>
          </div>

          {/* STATE */}

          <div className="form-group">
            <label>{t.state}</label>

            <div className="input-with-icon">
              <MapPin size={18} />

              <select
                value={form.state}
                onChange={(e) => {
                  update(
                    "state",
                    e.target.value
                  );

                  update(
                    "district",
                    ""
                  );

                  update(
                    "village",
                    ""
                  );
                }}
              >
                <option value="">
                  {t.selectState}
                </option>

                {Object.keys(
                  locationData
                ).map((state) => (
                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* DISTRICT */}

          <div className="form-group">
            <label>{t.district}</label>

            <div className="input-with-icon">
              <MapPin size={18} />

              <select
                value={form.district}
                disabled={!form.state}
                onChange={(e) => {
                  update(
                    "district",
                    e.target.value
                  );

                  update(
                    "village",
                    ""
                  );
                }}
              >
                <option value="">
                  {t.selectDistrict}
                </option>

                {form.state &&
                  Object.keys(
                    locationData[
                      form.state
                    ]
                  ).map(
                    (district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    )
                  )}
              </select>
            </div>
          </div>

          {/* VILLAGE / PANCHAYAT */}

          <div className="form-group">
            <label>{t.village}</label>

            <div className="input-with-icon">
              <MapPin size={18} />

              <select
                value={form.village}
                disabled={
                  !form.district
                }
                onChange={(e) =>
                  update(
                    "village",
                    e.target.value
                  )
                }
              >
                <option value="">
                  {t.selectVillage}
                </option>

                {form.state &&
                  form.district &&
                  locationData[
                    form.state
                  ][
                    form.district
                  ].map(
                    (village) => (
                      <option
                        key={village}
                        value={village}
                      >
                        {village}
                      </option>
                    )
                  )}
              </select>
            </div>
          </div>

          {/* KHASRA */}

          <div className="form-group">
            <label>{t.khasra}</label>

            <div className="input-with-icon">
              <Hash size={18} />

              <input
                type="text"
                value={form.khasra}
                placeholder={
                  t.khasraPlaceholder
                }
                onChange={(e) =>
                  update(
                    "khasra",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* VOICE */}

          <VoiceAssistant
            fields={voiceFields}
          />

          {/* CONTINUE */}

          <button
            type="submit"
            className="continue-button"
          >
            {t.continue}

            <ArrowRight size={19} />
          </button>

        </form>
      </div>
    </div>
  );
}

export default Register;