import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import { sendMessage } from "../api/chatService";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const data = await sendMessage(userMessage.text);
      const botMessage = { sender: "bot", text: data?.reply || "No hay respuesta" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "bot", text: "Error al enviar el mensaje." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24">
        {/* Ventana del chat */}
        <ChatWindow messages={messages} loading={loading} />

        {/* Input del chat */}
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </main>
    </div>
  );
};

export default Chat;
