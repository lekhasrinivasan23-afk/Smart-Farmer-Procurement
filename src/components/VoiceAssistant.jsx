import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, X, Volume2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function VoiceAssistant({ fields = [] }) {
  const { language } = useLanguage();

  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState("");

  const recognitionRef = useRef(null);
  const voicesRef = useRef([]);

  /* --------------------------------
     LOAD BROWSER VOICES
  -------------------------------- */

  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current =
        window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged =
      loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged =
        null;
    };
  }, []);

  /* --------------------------------
     LANGUAGE
  -------------------------------- */

  const getSpeechLanguage = () => {
    if (language === "ta") return "ta-IN";
    if (language === "hi") return "hi-IN";

    return "en-IN";
  };

  /* --------------------------------
     TEXT
  -------------------------------- */

  const text = {
    en: {
      start: "Fill Using Voice",
      listening: "Listening...",
      asking: "Please answer the question",
      finished: "All details completed!",
      unsupported:
        "Voice recognition is not supported. Please use Google Chrome.",
      retry: "Sorry, please try again.",
      stop: "Stop Voice",
      close: "Close",
    },

    ta: {
      start: "குரல் மூலம் நிரப்பவும்",
      listening: "கேட்கிறது...",
      asking: "கேள்விக்கு பதில் சொல்லுங்கள்",
      finished: "அனைத்து விவரங்களும் முடிந்துவிட்டன!",
      unsupported:
        "குரல் வசதி இந்த உலாவியில் இல்லை. Google Chrome பயன்படுத்தவும்.",
      retry: "மன்னிக்கவும், மீண்டும் முயற்சிக்கவும்.",
      stop: "குரலை நிறுத்து",
      close: "மூடு",
    },

    hi: {
      start: "आवाज़ से भरें",
      listening: "सुन रहा है...",
      asking: "कृपया प्रश्न का उत्तर दें",
      finished: "सभी जानकारी पूरी हो गई!",
      unsupported:
        "इस ब्राउज़र में वॉइस सुविधा उपलब्ध नहीं है। Google Chrome का उपयोग करें।",
      retry: "क्षमा करें, कृपया फिर से प्रयास करें।",
      stop: "आवाज़ बंद करें",
      close: "बंद करें",
    },
  };

  const t = text[language] || text.en;

  /* --------------------------------
     QUESTIONS
  -------------------------------- */

  const questions = {
    en: [
      "Please tell me your name.",
      "Please tell me your Aadhaar number.",
      "Please tell me your state.",
      "Please tell me your district.",
      "Please tell me your village or panchayat.",
      "Please tell me your Khasra or survey number.",

      "Please tell me the crop type.",
      "Please tell me the quantity in kilograms.",
      "Please tell me the harvest date.",
      "Please tell me the crop grade: A, B, or C.",
    ],

    ta: [
      "உங்கள் பெயரை சொல்லுங்கள்.",
      "உங்கள் ஆதார் எண்ணை சொல்லுங்கள்.",
      "உங்கள் மாநிலத்தின் பெயரை சொல்லுங்கள்.",
      "உங்கள் மாவட்டத்தின் பெயரை சொல்லுங்கள்.",
      "உங்கள் கிராமம் அல்லது பஞ்சாயத்து பெயரை சொல்லுங்கள்.",
      "உங்கள் கஸ்ரா அல்லது சர்வே எண்ணை சொல்லுங்கள்.",

      "பயிர் வகையை சொல்லுங்கள்.",
      "அளவை கிலோவில் சொல்லுங்கள்.",
      "அறுவடை தேதியை சொல்லுங்கள்.",
      "பயிர் தரத்தை சொல்லுங்கள். A, B அல்லது C.",
    ],

    hi: [
      "कृपया अपना नाम बताएं।",
      "कृपया अपना आधार नंबर बताएं।",
      "कृपया अपने राज्य का नाम बताएं।",
      "कृपया अपने जिले का नाम बताएं।",
      "कृपया अपने गांव या पंचायत का नाम बताएं।",
      "कृपया अपना खसरा या सर्वे नंबर बताएं।",

      "कृपया फसल का प्रकार बताएं।",
      "कृपया मात्रा किलोग्राम में बताएं।",
      "कृपया कटाई की तारीख बताएं।",
      "कृपया फसल का ग्रेड बताएं। A, B या C।",
    ],
  };

  /* --------------------------------
     FIND CORRECT VOICE
  -------------------------------- */

  const findVoice = (lang) => {
    const voices = voicesRef.current || [];

    if (lang === "ta-IN") {
      return (
        voices.find(
          (voice) => voice.lang === "ta-IN"
        ) ||
        voices.find((voice) =>
          voice.lang
            .toLowerCase()
            .startsWith("ta")
        )
      );
    }

    if (lang === "hi-IN") {
      return (
        voices.find(
          (voice) => voice.lang === "hi-IN"
        ) ||
        voices.find((voice) =>
          voice.lang
            .toLowerCase()
            .startsWith("hi")
        )
      );
    }

    return (
      voices.find(
        (voice) => voice.lang === "en-IN"
      ) ||
      voices.find((voice) =>
        voice.lang
          .toLowerCase()
          .startsWith("en")
      )
    );
  };

  /* --------------------------------
     SPEAK
  -------------------------------- */

  const speak = (message) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      const speechLanguage =
        getSpeechLanguage();

      const utterance =
        new SpeechSynthesisUtterance(message);

      utterance.lang = speechLanguage;

      const voice =
        findVoice(speechLanguage);

      if (voice) {
        utterance.voice = voice;
      }

      /*
        Slower Tamil/Hindi speech
        for clearer pronunciation
      */

      utterance.rate =
        language === "ta"
          ? 0.70
          : language === "hi"
          ? 0.75
          : 0.85;

      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = resolve;
      utterance.onerror = resolve;

      window.speechSynthesis.speak(
        utterance
      );
    });
  };

  /* --------------------------------
     PROCESS ANSWER
  -------------------------------- */

  const processValue = (index, value) => {
    const field = fields[index];

    if (!field) return;

    let finalValue = value.trim();

    /* Aadhaar */

    if (field.key === "aadhaar") {
      finalValue = value
        .replace(/\D/g, "")
        .slice(0, 12);
    }

    /* Quantity */

    if (field.key === "quantity") {
      finalValue = value.replace(
        /\D/g,
        ""
      );
    }

    /* Grade */

    if (field.key === "grade") {
      const upper =
        value.toUpperCase();

      if (
        upper.includes("A") ||
        value.includes("ஏ") ||
        value.includes("ए")
      ) {
        finalValue = "A";
      } else if (
        upper.includes("B") ||
        value.includes("பி") ||
        value.includes("बी")
      ) {
        finalValue = "B";
      } else if (
        upper.includes("C") ||
        value.includes("சி") ||
        value.includes("सी")
      ) {
        finalValue = "C";
      }
    }

    /* Harvest Date */

    if (field.key === "harvestDate") {
      const dateMatch = value.match(
        /(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/
      );

      if (dateMatch) {
        const day =
          dateMatch[1].padStart(2, "0");

        const month =
          dateMatch[2].padStart(2, "0");

        const year = dateMatch[3];

        finalValue =
          `${year}-${month}-${day}`;
      }
    }

    field.setValue(finalValue);
  };

  /* --------------------------------
     ASK NEXT QUESTION
  -------------------------------- */

  const listenForAnswer = async (index) => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(t.unsupported);
      setIsActive(false);
      return;
    }

    if (index >= fields.length) {
      setIsListening(false);
      setIsActive(false);
      setStatus(t.finished);

      await speak(t.finished);

      return;
    }

    setCurrentStep(index);

    const questionIndex =
      fields[index].questionIndex ??
      index;

    const question =
      questions[language]?.[questionIndex] ||
      questions.en[questionIndex];

    /*
      Speak question
    */

    setStatus(t.asking);

    await speak(question);

    /*
      Start recognition
    */

    const recognition =
      new SpeechRecognition();

    recognition.lang =
      getSpeechLanguage();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current =
      recognition;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus(t.listening);
    };

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0]
          .transcript;

      processValue(
        index,
        spokenText
      );

      setIsListening(false);

      /*
        Automatically ask next question
      */

      setTimeout(() => {
        listenForAnswer(index + 1);
      }, 700);
    };

    recognition.onerror = (event) => {
      console.log(
        "Voice error:",
        event.error
      );

      setIsListening(false);

      if (
        event.error === "no-speech"
      ) {
        setTimeout(() => {
          listenForAnswer(index);
        }, 500);

        return;
      }

      alert(t.retry);
      setIsActive(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.log(error);
    }
  };

  /* --------------------------------
     START
  -------------------------------- */

  const startVoice = async () => {
    if (fields.length === 0) return;

    setIsActive(true);
    setCurrentStep(0);

    if (window.speechSynthesis) {
      voicesRef.current =
        window.speechSynthesis.getVoices();
    }

    await listenForAnswer(0);
  };

  /* --------------------------------
     STOP
  -------------------------------- */

  const stopVoice = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsListening(false);
    setIsActive(false);
    setStatus("");
  };

  /* --------------------------------
     CLEANUP
  -------------------------------- */

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  /* --------------------------------
     UI
  -------------------------------- */

  return (
    <div style={{ marginTop: "18px" }}>

      {!isActive ? (
        <button
          type="button"
          className="voice-control"
          onClick={startVoice}
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "13px 18px",
          }}
        >
          <Mic size={20} />

          <span>{t.start}</span>
        </button>
      ) : (
        <div
          style={{
            border: "1px solid #d7e8d8",
            borderRadius: "14px",
            padding: "18px",
            background: "#f7fbf7",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {isListening ? (
                <Mic size={22} />
              ) : (
                <Volume2 size={22} />
              )}

              <strong>
                {isListening
                  ? t.listening
                  : t.asking}
              </strong>
            </div>

            <button
              type="button"
              onClick={stopVoice}
              title={t.close}
              style={{
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>

          </div>

          {/* PROGRESS */}

          <div
            style={{
              display: "flex",
              gap: "5px",
              marginBottom: "15px",
            }}
          >
            {fields.map((_, index) => (
              <div
                key={index}
                style={{
                  height: "5px",
                  flex: 1,
                  borderRadius: "5px",
                  background:
                    index <= currentStep
                      ? "#2e7d32"
                      : "#dce8dc",
                }}
              />
            ))}
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {status}
          </p>

          <button
            type="button"
            onClick={stopVoice}
            style={{
              marginTop: "15px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent:
                "center",
              gap: "8px",
              padding: "10px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
          >
            <MicOff size={18} />
            {t.stop}
          </button>

        </div>
      )}
    </div>
  );
}

export default VoiceAssistant;