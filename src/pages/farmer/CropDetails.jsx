import { useState } from "react";
import {
  Wheat,
  CalendarDays,
  Scale,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import VoiceAssistant from "../../components/VoiceAssistant";
import "../../App.css";

// ======================================
// DEMO CROP OPTIONS
// ======================================

const cropOptions = [
  "Paddy / Rice",
  "Wheat",
  "Maize",
  "Groundnut",
  "Sugarcane",
  "Cotton",
  "Soybean",
  "Sorghum / Jowar",
  "Pearl Millet / Bajra",
  "Chickpea / Chana",
  "Black Gram / Urad",
  "Green Gram / Moong",
  "Chilli",
  "Onion",
  "Tomato",
];

function CropDetails() {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    harvestDate: "",
    grade: "A",
  });

  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ======================================
  // LANGUAGE TEXT
  // ======================================

  const text = {
    en: {
      title: "Crop Details",
      subtitle: "Enter the crop you want to procure",

      crop: "Crop Type",
      cropPlaceholder: "Select crop",

      quantity: "Quantity (kg)",
      quantityPlaceholder: "Enter quantity",

      harvest: "Harvest Date",

      grade: "Crop Grade",

      selectCrop: "Select Crop",

      find: "Find Procurement Centres",

      error: "Please fill all crop details.",
    },

    ta: {
      title: "பயிர் விவரங்கள்",
      subtitle:
        "கொள்முதல் செய்ய வேண்டிய பயிரின் விவரங்களை உள்ளிடவும்",

      crop: "பயிர் வகை",
      cropPlaceholder:
        "பயிரை தேர்வு செய்யவும்",

      quantity: "அளவு (கிலோ)",
      quantityPlaceholder:
        "அளவை உள்ளிடவும்",

      harvest: "அறுவடை தேதி",

      grade: "பயிர் தரம்",

      selectCrop:
        "பயிரை தேர்வு செய்யவும்",

      find:
        "கொள்முதல் மையங்களை காண்க",

      error:
        "அனைத்து பயிர் விவரங்களையும் நிரப்பவும்.",
    },

    hi: {
      title: "फसल विवरण",
      subtitle:
        "जिस फसल को बेचना है उसकी जानकारी दर्ज करें",

      crop: "फसल का प्रकार",
      cropPlaceholder:
        "फसल चुनें",

      quantity: "मात्रा (किलो)",
      quantityPlaceholder:
        "मात्रा दर्ज करें",

      harvest: "कटाई की तारीख",

      grade: "फसल ग्रेड",

      selectCrop: "फसल चुनें",

      find: "खरीद केंद्र खोजें",

      error:
        "कृपया सभी फसल विवरण भरें।",
    },
  };

  const t = text[language] || text.en;

  // ======================================
  // VOICE FIELDS
  // ======================================

  const voiceFields = [
    {
      key: "crop",
      questionIndex: 6,

      setValue: (value) => {
        const spoken = value
          .trim()
          .toLowerCase();

        const matchedCrop =
          cropOptions.find(
            (crop) =>
              crop.toLowerCase() === spoken
          ) ||
          cropOptions.find(
            (crop) =>
              spoken.includes(
                crop.toLowerCase()
              ) ||
              crop
                .toLowerCase()
                .includes(spoken)
          );

        if (matchedCrop) {
          update("crop", matchedCrop);
        }
      },
    },

    {
      key: "quantity",
      questionIndex: 7,

      setValue: (value) => {
        update(
          "quantity",
          value.replace(/\D/g, "")
        );
      },
    },

    {
      key: "harvestDate",
      questionIndex: 8,

      setValue: (value) => {
        let finalValue = value.trim();

        // Supports DD/MM/YYYY
        const dateMatch = value.match(
          /(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/
        );

        if (dateMatch) {
          const day =
            dateMatch[1].padStart(2, "0");

          const month =
            dateMatch[2].padStart(2, "0");

          const year =
            dateMatch[3];

          finalValue =
            `${year}-${month}-${day}`;
        }

        update(
          "harvestDate",
          finalValue
        );
      },
    },

    {
      key: "grade",
      questionIndex: 9,

      setValue: (value) => {
        const upper =
          value.toUpperCase();

        if (
          upper.includes("A") ||
          value.includes("ஏ") ||
          value.includes("ए")
        ) {
          update("grade", "A");
        } else if (
          upper.includes("B") ||
          value.includes("பி") ||
          value.includes("बी")
        ) {
          update("grade", "B");
        } else if (
          upper.includes("C") ||
          value.includes("சி") ||
          value.includes("सी")
        ) {
          update("grade", "C");
        }
      },
    },
  ];

  // ======================================
  // SUBMIT
  // ======================================

  const submit = (e) => {
    e.preventDefault();

    if (
      !form.crop ||
      !form.quantity ||
      !form.harvestDate
    ) {
      alert(t.error);
      return;
    }

    localStorage.setItem(
      "argi_crop",
      JSON.stringify(form)
    );

    navigate("/centres");
  };

  // ======================================
  // UI
  // ======================================

  return (
    <div className="form-page">
      <div className="form-card">

        {/* HEADING */}

        <div className="page-heading">
          <div className="page-icon">
            <Wheat size={30} />
          </div>

          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>

        <form onSubmit={submit}>

          {/* =========================
              CROP TYPE
          ========================= */}

          <div className="form-group">
            <label>{t.crop}</label>

            <div className="input-with-icon">
              <Wheat size={18} />

              <select
                value={form.crop}
                onChange={(e) =>
                  update(
                    "crop",
                    e.target.value
                  )
                }
              >
                <option value="">
                  {t.selectCrop}
                </option>

                {cropOptions.map(
                  (crop) => (
                    <option
                      key={crop}
                      value={crop}
                    >
                      {crop}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* =========================
              QUANTITY
          ========================= */}

          <div className="form-group">
            <label>{t.quantity}</label>

            <div className="input-with-icon">
              <Scale size={18} />

              <input
                type="number"
                min="1"
                value={form.quantity}
                placeholder={
                  t.quantityPlaceholder
                }
                onChange={(e) =>
                  update(
                    "quantity",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* =========================
              HARVEST DATE
          ========================= */}

          <div className="form-group">
            <label>{t.harvest}</label>

            <div className="input-with-icon">
              <CalendarDays size={18} />

              <input
                type="date"
                value={
                  form.harvestDate
                }
                onChange={(e) =>
                  update(
                    "harvestDate",
                    e.target.value
                  )
                }
              />
            </div>
          </div>

          {/* =========================
              CROP GRADE
          ========================= */}

          <div className="form-group">
            <label>{t.grade}</label>

            <select
              value={form.grade}
              onChange={(e) =>
                update(
                  "grade",
                  e.target.value
                )
              }
            >
              <option value="A">
                Grade A
              </option>

              <option value="B">
                Grade B
              </option>

              <option value="C">
                Grade C
              </option>
            </select>
          </div>

          {/* =========================
              VOICE ASSISTANT
          ========================= */}

          <VoiceAssistant
            fields={voiceFields}
          />

          {/* =========================
              CONTINUE
          ========================= */}

          <button
            className="continue-button"
            type="submit"
          >
            {t.find}

            <ArrowRight size={19} />
          </button>

        </form>
      </div>
    </div>
  );
}

export default CropDetails;