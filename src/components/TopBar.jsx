import { Mic, Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function TopBar() {
  const { language, setLanguage, languages } = useLanguage();

  const startVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "Voice recognition is not supported in this browser. Please use Google Chrome."
      );
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = languages[language].speech;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Voice recognition started");
    };

    recognition.onresult = (event) => {
      const spokenText =
        event.results[0][0].transcript;

      const activeElement = document.activeElement;

      if (
        activeElement &&
        (
          activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA"
        )
      ) {
        const nativeInputValueSetter =
          Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;

        if (
          activeElement.tagName === "INPUT" &&
          nativeInputValueSetter
        ) {
          nativeInputValueSetter.call(
            activeElement,
            spokenText
          );

          activeElement.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );
        } else {
          activeElement.value = spokenText;

          activeElement.dispatchEvent(
            new Event("input", {
              bubbles: true,
            })
          );
        }
      } else {
        alert(
          language === "ta"
            ? `நீங்கள் சொன்னது: ${spokenText}`
            : language === "hi"
            ? `आपने कहा: ${spokenText}`
            : `You said: ${spokenText}`
        );
      }
    };

    recognition.onerror = (event) => {
      console.log("Voice error:", event.error);

      if (event.error !== "no-speech") {
        alert(
          language === "ta"
            ? "மன்னிக்கவும், மீண்டும் முயற்சிக்கவும்."
            : language === "hi"
            ? "क्षमा करें, कृपया फिर से प्रयास करें।"
            : "Sorry, please try again."
        );
      }
    };

    recognition.start();
  };

  return (
    <div className="top-bar">

      {/* LANGUAGE */}
      <div className="language-control">
        <Languages size={20} />

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
        >
          {Object.entries(languages).map(
            ([code, item]) => (
              <option
                key={code}
                value={code}
              >
                {item.nativeName}
              </option>
            )
          )}
        </select>
      </div>

      {/* VOICE */}
      <button
        className="voice-control"
        onClick={startVoice}
        type="button"
      >
        <Mic size={21} />

        <span>
          {language === "ta"
            ? "குரல்"
            : language === "hi"
            ? "आवाज़"
            : "Voice"}
        </span>
      </button>

    </div>
  );
}

export default TopBar;