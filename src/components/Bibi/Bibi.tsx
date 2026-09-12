import { useEffect, useRef, useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import CapibMouth from "../../assets/capib-mouth.png";
import Capib from "../../assets/capib.png";

// const API_KEY = "";
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const chat = model.startChat();
let voices: SpeechSynthesisVoice[] = [];

const Bibi = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const listeningRef = useRef<boolean>(false);
  const mouthRef = useRef<HTMLImageElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      voices = window.speechSynthesis.getVoices();
    };

    loadVoices();

    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      console.error("Speech Recognition API not supported in this browser.");
      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      };
    }

    const recognitionInstance = new SpeechRecognitionClass();
    recognitionInstance.lang = "pt-BR";
    recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript;
      const utterance = new SpeechSynthesisUtterance(
        `Desculpe, ainda estou aprendendo a falar, mas você disse: ${speechToText}`
      );
      utterance.lang = "pt-BR";
      utterance.voice = voices[1] ?? null;
      utterance.pitch = 2;
      utterance.onstart = () => mouthRef.current?.classList.add("talking");
      utterance.onend = () => mouthRef.current?.classList.remove("talking");
      window.speechSynthesis.speak(utterance);
    };
    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      listeningRef.current = false;
    };
    recognitionInstance.onend = () => {
      listeningRef.current = false;
    };
    setRecognition(recognitionInstance);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      recognitionInstance.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  // const addResponse = (text: string) => {
  //   setResponses((prevResponses) => [...prevResponses, text]);
  // };

  // const sendToAPI = async (message: string): Promise<string> => {
  //   const result = await chat.sendMessage(message);
  //   const response = await result.response;
  //   const text = await response.text();
  //   return text;
  // };

  const startSpeechRecognition = () => {
    if (recognition && !listeningRef.current) {
      listeningRef.current = true;
      recognition.start();
    }
  };

  // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" && inputRef.current) {
  //     const message = inputRef.current.value;
  //     inputRef.current.value = "";

  //     sendToAPI(message).then(addResponse);
  //   }
  // };

  return (
    <div id="capybara-widget" className="widget">
      <div className="capybara">
        <div className="eye left-eye">
          <div className="eyelid"></div>
        </div>
        <div className="eye right-eye">
          <div className="eyelid"></div>
        </div>
        <img src={Capib} alt="Capybara" id="capybara-img" />
        <img
          src={CapibMouth}
          className="capybara-mouth"
          alt="Capybara Mouth"
          id="capybara-mouth"
          ref={mouthRef}
        />
      </div>
      <button onClick={startSpeechRecognition}>Olá!</button>

      {/* <input type="text" id="input-text" placeholder="Type a message" ref={inputRef} onKeyDown={handleKeyDown} /> */}
      <div id="responses">
        {responses.map((response, index) => (
          <div key={index} className="response-bubble">
            {response}
            <span
              className="close-btn"
              onClick={() =>
                setResponses(responses.filter((_, i) => i !== index))
              }
            >
              X
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bibi;
