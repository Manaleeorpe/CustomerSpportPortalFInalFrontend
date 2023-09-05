import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";


const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async (message) => {
    if (message.trim() === "") return;

    // Update chat history with user input
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: message },
    ]);

    try {
      const response = await fetch("http://localhost:8080/auth/customer/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const responseBody = await response.text();

      if (response.status === 200) {
        // Add a delay before updating chat history with bot reply
        setTimeout(() => {
          setChatHistory((prevHistory) => [
            ...prevHistory,
            { role: "bot", content: responseBody },
          ]);
          
        }, 1000); // Delay of 1 second
      } else {
        console.error("Unexpected response status:", response.status);
        // Handle error response, show user-friendly error message
        // For example, set an error state and display an error message to the user
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error, show user-friendly error message
      // For example, set an error state and display an error message to the user
    }
    setUserInput("");
  };

  const startVoiceRecognition = () => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.onresult = (event) => {
      const recognizedText = event.results[0][0].transcript;
      // Automatically send the recognized text for voice input
      handleSend(recognizedText);
    };
    recognitionInstance.start();
    setRecognition(recognitionInstance);
    setIsListening(true);
  };

  const stopVoiceRecognition = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speak = (message, isVoiceInput) => {
    if (isVoiceInput) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(message);
      synth.speak(utterance);
    }
  };

  // Cleanup recognition instance on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [recognition]);

  return (
    <div id="chat-component" style={{ backgroundColor: "#ffffff", maxWidth: "600px", margin: "0 auto", padding: "20px", borderRadius: "10px" }}>
      <div style={{ marginBottom: "20px" }}>
        
        <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px", fontSize: "16px" }}>
          {chatHistory.map((chat, index) => (
            <div key={index} style={{ marginBottom: "10px", textAlign: chat.role === "user" ? "right" : "left" }}>
              <div style={{ backgroundColor: chat.role === "user" ? "#ac2358" : "#f0f0f0", color: chat.role === "user" ? "#fff" : "#333", padding: "8px 12px", borderRadius: "8px", display: "inline-block" }} dangerouslySetInnerHTML={{ __html: chat.content }}>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleInputChange}
          style={{
            flex: "1",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
          }}
        />
        <button
          onClick={() => handleSend(userInput)}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#ac2358",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Send
        </button>
        {isListening ? (
          <button
            onClick={stopVoiceRecognition}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {/* Replace the "Stop Voice" button with a red microphone icon */}
            <FontAwesomeIcon icon={faMicrophoneSlash} />
          </button>
        ) : (
          <button
            onClick={startVoiceRecognition}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#ac2358",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {/* Replace the "Start Voice" button with a green microphone icon */}
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;