
import React, { useState } from "react";

const ChatComponent = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async () => {
    if (userInput.trim() === "") return;

    // Update chat history with user input
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { role: "user", content: userInput },
    ]);

    try {
      const response = await fetch("http://localhost:8080/auth/customer/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
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

    // Clear the input
    setUserInput("");
  };

  return (
    <div id="chat-component" style={{ backgroundColor: "#ffffff", maxWidth: "600px", margin: "0 auto", padding: "20px", borderRadius: "10px" }}>
      <div style={{ marginBottom: "20px" }}>
        
        <div style={{ border: "1px solid #ddd", padding: "10px", minHeight: "200px", fontSize: "16px" }}>
          {chatHistory.map((chat, index) => (
            <div key={index} style={{ marginBottom: "10px", textAlign: chat.role === "user" ? "right" : "left" }}>
              <div style={{ backgroundColor: chat.role === "user" ? "#ac2358" : "#f0f0f0", color: chat.role === "user" ? "#fff" : "#333", padding: "8px 12px", borderRadius: "8px", display: "inline-block" }} 
              dangerouslySetInnerHTML={{
                       __html: chat.content, // Render HTML content as-is
                  }}>
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
          style={{ flex: "1", padding: "10px", fontSize: "16px", borderRadius: "4px" }}
        />
        <button onClick={handleSend} style={{ marginLeft: "10px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#ac2358", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;









