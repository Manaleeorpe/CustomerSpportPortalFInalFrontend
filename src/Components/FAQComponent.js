import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMicrophone, faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

const FAQComponent = () => {
  const [faqs, setFaqs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Fetch FAQs from the server
    fetch("http://localhost:8080/auth/customer/getAllFaqs")
      .then((response) => response.json())
      .then((data) => {
        setFaqs(data);
        setFilteredFaqs(data);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
      });
  }, []);

  useEffect(() => {
    // Filter FAQs based on search query
    const filtered = faqs.filter((faq) =>
      faq.faqType.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchQuery, faqs]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Perform search based on the current searchQuery
    // You can implement the search logic here
  };

  const startVoiceRecognition = () => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.onresult = (event) => {
      const recognizedText = event.results[0][0].transcript;
      const cleanedText = recognizedText.toLowerCase().replace(".", ""); // Convert to lowercase and remove periods
      setSearchQuery(cleanedText); // Update the search query with cleaned text
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

  return (
    <div id="faqs" style={{ backgroundColor: "#ac2358", padding: "40px 0", marginTop: "20px" }}>
      <div className="container">
        <div className="section-title text-center">
          <h2 style={{ color: "#fff", marginBottom: "10px" }}>Frequently Asked Questions</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="search-bar" style={{ backgroundColor: "#fff", borderRadius: "4px", display: "flex", alignItems: "center", marginBottom: "20px" }}>
              <button onClick={handleSearch} style={{ padding: "5px 10px", marginLeft: "5px", border: "none" }}>
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "24px", color: "#ac2358" }}
                />
              </button>
              <input
                type="text"
                placeholder="Search FAQs by type"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  flex: "1",
                  padding: "10px 10px 10px 10px", // Adjusted padding
                  fontSize: "16px",
                  border: "none",
                  outline: "none",
                }}
              />
              <button onClick={isListening ? stopVoiceRecognition : startVoiceRecognition} style={{ padding: "5px 10px", marginRight: "5px", border: "none" }}>
                <FontAwesomeIcon
                  icon={isListening ? faMicrophoneSlash : faMicrophone}
                  style={{ fontSize: "24px", color: isListening ? "red" : "#ac2358" }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.faqId}
              className="col-md-4"
            >
              <div
                className="faq"
                style={{
                  backgroundColor: "#ac2358",
                  boxShadow: "0 4px 6px rgba(152,20,77,0.5)",
                  color: "#fff",
                  padding: "20px",
                  marginBottom: "20px"
                }}
              >
                <div className="faq-content">
                  <p style={{ fontWeight: "bold", fontSize: "15px" }}>{faq.question}</p>
                  <div style={{ fontSize: "15px" }}>{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQComponent;