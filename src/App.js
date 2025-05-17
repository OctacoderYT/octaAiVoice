// import React, { useEffect, useState } from 'react';
// import './App.css';

// function App() {
//   const [text, setText] = useState('');
//   const [voices, setVoices] = useState([]);
//   const [selectedVoice, setSelectedVoice] = useState('');

//   useEffect(() => {
//     const loadVoices = () => {
//       const synthVoices = window.speechSynthesis.getVoices();
//       setVoices(synthVoices);
//     };

//     window.speechSynthesis.onvoiceschanged = loadVoices;
//     loadVoices();
//   }, []);

//   const speak = () => {
//     if (!selectedVoice || !text) return;
//     const utterance = new SpeechSynthesisUtterance(text);
//     const voice = voices.find(v => v.name === selectedVoice);
//     if (voice) {
//       utterance.voice = voice;
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <div className="wrapper">
//       <div className="container">
//         <h2>Text To AI Generated Voice Converter</h2>
//         <textarea
//           rows="8"
//           placeholder="Type Your Text Here..."
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />
//         <select
//           value={selectedVoice}
//           onChange={(e) => {
//             window.speechSynthesis.cancel();
//             setSelectedVoice(e.target.value);
//           }}
//         >
//           <option value="">Select Your Voice</option>
//           {voices.map((voice, i) => (
//             <option key={i} value={voice.name}>
//               {voice.name} ({voice.lang})
//             </option>
//           ))}
//         </select>
//         <button onClick={speak}>Convert To AI Voice</button>
//       </div>
//     </div>
//   );
// }

// export default App;


/*** darl/light toggle added code start here */

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    speechSynthesis.addEventListener("voiceschanged", loadVoices);
  }, []);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <div className="container">
        <h2>Text To AI Generated Voice Converter</h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type Your Text Here..."
          rows="6"
        />

        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option value="">Select Your Voice</option>
          {voices.map((voice, i) => (
            <option key={i} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>

        <button onClick={speakText}>Convert To AI Voice</button>

        <div className="toggle-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
            />
            <span className="slider round"></span>
          </label>
          <span>{isDarkMode ? " " : " "}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
