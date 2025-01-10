import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "User", text: input }]);
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/chat", {
        message: input,
      });

      // Extract and log the response
      console.log("API Response:", response.data);
      const botMessage = response.data.message || "No response from the bot.";

      // Add bot response to the chat
      setMessages((prev) => [...prev, { sender: "Bot", text: botMessage }]);
    } catch (error) {
      console.error("Error:", error);

      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Error: Unable to fetch response." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Chatbot</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "20px",
          borderRadius: "5px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "User" ? "right" : "left",
              margin: "10px 0",
            }}
          >
            <strong>{msg.sender}:</strong>{" "}
            {msg.sender === "Bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            background: loading ? "#ccc" : "#007BFF",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default App;
