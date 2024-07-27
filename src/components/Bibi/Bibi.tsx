import { useState, useEffect, useRef } from 'react';
// import { GoogleGenerativeAI } from "@google/generative-ai";
import Capib from '../../assets/capib.png'
import CapibMouth from '../../assets/capib-mouth.png'

// const API_KEY = "";
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// const chat = model.startChat();
let voices: SpeechSynthesisVoice[] = []

const Bibi = () => {
  const [responses, setResponses] = useState<string[]>([]);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const listeningRef = useRef<boolean>(false)
  const mouthRef = useRef<HTMLImageElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  // const inputRef = useRef<HTMLInputElement | null>(null);
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initializeSpeechRecognition = () => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }
    const recognitionInstance = new SpeechRecognitionClass();
    recognitionInstance.lang = "pt-BR";

    recognitionInstance.onresult = async (event: SpeechRecognitionEvent) => {
      const speechToText = event.results[0][0].transcript;
      //const response = await sendToAPI(speechToText);
      //addResponse(response);
      //textToSpeech(response);
      textToSpeech("Desculpe, ainda estou aprendendo a falar, mas você disse: " + speechToText);
    };

    recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      listeningRef.current = false;
    };

    recognitionInstance.onend = () => {
      listeningRef.current = false;
    };

    setRecognition(recognitionInstance);
  };

  useEffect(() => {
    const loadVoices = () => {
      voices = window.speechSynthesis.getVoices()
    };

    loadVoices();

    window.speechSynthesis.onvoiceschanged = function () { loadVoices(); }
    initializeSpeechRecognition()
  }, []);

  useEffect(() => {
    const widget = widgetRef.current;
    if (!widget) return;
    let shiftX: number, shiftY: number;

    const moveAt = (pageX: number, pageY: number) => {
      widget.style.left = pageX - shiftX + "px";
      widget.style.top = pageY - shiftY + "px";
    };

    const onMouseMove = (event: MouseEvent) => {
      moveAt(event.pageX, event.pageY);
    };

    const onMouseDown = (event: MouseEvent) => {
      shiftX = event.clientX - widget.getBoundingClientRect().left;
      shiftY = event.clientY - widget.getBoundingClientRect().top;
      document.addEventListener("mousemove", onMouseMove);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (widget) {
        widget.onmouseup = null;
      }
    };

    widget.addEventListener("mousedown", onMouseDown);
    widget.addEventListener("mouseup", onMouseUp);
    widget.ondragstart = () => false;

    return () => {
      widget.removeEventListener("mousedown", onMouseDown);
      widget.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const getRandomDuration = (): string => {
    const minDuration = 0.3;
    const maxDuration = 1.5;
    return (Math.random() * (maxDuration - minDuration) + minDuration) + 's';
  };

  const startRandomAnimation = () => {
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    animationIntervalRef.current = setInterval(() => {
      const newDuration = getRandomDuration();
      if (mouthRef.current) {
        mouthRef.current.style.animationDuration = newDuration;
      }
    }, 200);
  };

  const stopRandomAnimation = () => {
    if (animationIntervalRef.current) clearInterval(animationIntervalRef.current);
    if (mouthRef.current) {
      mouthRef.current.style.animationDuration = '';
    }
  };

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

  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      // if (!recognition) {
      //   initializeSpeechRecognition();
      // }
      startSpeechRecognition();
    }
  });

  const textToSpeech = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.voice = voices[1];
    utterance.pitch = 2;
    utterance.onstart = () => {
      if (mouthRef.current) {
        mouthRef.current.classList.add("talking");
      }
      startRandomAnimation();
    };
    utterance.onend = () => {
      if (mouthRef.current) {
        mouthRef.current.classList.remove("talking");
      }
      stopRandomAnimation();
    };
    speechSynthesis.speak(utterance);
  };

  return (
    <div id="capybara-widget" className="widget" ref={widgetRef}>
      <div className="capybara">
        <div className="eye left-eye">
          <div className="eyelid"></div>
        </div>
        <div className="eye right-eye">
          <div className="eyelid"></div>
        </div>
        <img src={Capib} alt="Capybara" id="capybara-img" />
        <img src={CapibMouth} className="capybara-mouth" alt="Capybara Mouth" id="capybara-mouth" ref={mouthRef} />
      </div>
      <span className='capib-tip'>Tecle espaço e fale ao microfone</span>
      {/* <input type="text" id="input-text" placeholder="Type a message" ref={inputRef} onKeyDown={handleKeyDown} /> */}
      <div id="responses">
        {responses.map((response, index) => (
          <div key={index} className="response-bubble">
            {response}
            <span className="close-btn" onClick={() => setResponses(responses.filter((_, i) => i !== index))}>X</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bibi;
