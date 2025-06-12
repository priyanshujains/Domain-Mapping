import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const sendMessage = async () => {
    try {
      const res = await axios.post("http://localhost:8080/message", {
        message,
      });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse("Error contacting server.");
    }
  };

  return (
    <div className="container">
      <h1>💬 Message App</h1>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {response && <p className="response">{response}</p>}
    </div>
  );
}

export default App;
