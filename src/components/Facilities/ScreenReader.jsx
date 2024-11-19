import React, { useState, useEffect } from "react";

const ScreenReader = () => {
  const [text, setText] = useState(""); // Text input from user
  const [voices, setVoices] = useState([]); // List of available voices
  const [selectedVoice, setSelectedVoice] = useState(null); // The currently selected voice

  // Populating available voices and setting the default one (e.g., a female voice)
  useEffect(() => {
    const populateVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Default to the first female voice if available
      const femaleVoice = availableVoices.find((voice) =>
        voice.name.toLowerCase().includes("female")
      );
      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Fallback to the first available voice
      }
    };

    populateVoices(); // Initial call to populate voices

    // Re-run when voices change (e.g., after loading or language change)
    window.speechSynthesis.onvoiceschanged = populateVoices;

    // Cleanup the event listener on unmount
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    if (text.trim() === "") return;

    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = selectedVoice;
    speech.lang = "en-US";
    speech.rate = 1;

    speech.onend = () => {
      console.log("Speech has finished.");
    };

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="container mx-auto p-5 max-w-md">
      <h1 className="text-3xl font-bold mb-4 text-center">Screen Reader</h1>

      {/* Add a label for the textarea */}
      <label htmlFor="text-input" className="block text-sm font-medium mb-2">
        Enter text to read aloud
      </label>
      <textarea
        id="text-input" // Link the textarea with the label via the id
        className="w-full p-3 border rounded mb-4"
        rows="6"
        placeholder="Enter text here to read aloud..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSpeak}
        className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-600 transition duration-800"
      >
        Read Aloud
      </button>

      <div className="mt-4">
        <h2 className="text-xl">Available Voices:</h2>
        <div className="mb-4">
          <label htmlFor="voice-select" className="block text-sm font-medium">
            Select a voice
          </label>

          <select
            id="voice-select"
            className="w-full p-2 border rounded"
            value={voices.findIndex((voice) => voice === selectedVoice)} // Set value based on the selected voice index
            onChange={(e) => setSelectedVoice(voices[e.target.value])} // Update selected voice based on index
            aria-label="Select a voice" // Ensure that screen readers recognize this as the voice selector
          >
            {/* Fallback when no voices are loaded */}
            <option value="" disabled>
              Select a voice
            </option>

            {voices.length === 0 ? (
              <option disabled>No voices available</option>
            ) : (
              voices.map((voice, index) => (
                <option key={index} value={index}>
                  {voice.name} ({voice.lang})
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ScreenReader;
