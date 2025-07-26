import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/api/message", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!receiverId || !content) {
      alert("Receiver ID and content required");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ receiverId, content }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Failed to send: ${error.error}`);
        return;
      }

      setContent("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Messages</h2>

      <div>
        <input
          type="text"
          placeholder="Receiver ID"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          style={{ marginRight: "1rem" }}
        />
        <input
          type="text"
          placeholder="Your message"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={sendMessage} style={{ marginLeft: "1rem" }}>
          Send
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Conversation</h3>
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <ul>
            {messages.map((msg) => (
              <li key={msg.id}>
                <strong>From:</strong> {msg.senderId}{" "}
                <strong>To:</strong> {msg.receiverId} <br />
                {msg.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Messages;
