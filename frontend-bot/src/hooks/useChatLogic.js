import { useState, useEffect } from "react";
import { sendMessage } from "../api/chatService";

export const useChatLogic = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [botState, setBotState] = useState('quieto');

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    setBotState('parloteo1');
    
    const userMessage = { sender: "user", text: input, id: Date.now() };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      setBotState('parloteo2');
      
      const data = await sendMessage(userMessage.text);
      const botMessage = { 
        sender: "bot", 
        text: data?.reply || "No hay respuesta disponible", 
        id: Date.now() + 1 
      };
      
      setMessages(prev => [...prev, botMessage]);
      setBotState('quieto');
      
    } catch (error) {
      setBotState('quieto');
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    loading,
    botState,
    handleSend,
    updateInput: setInput
  };
};