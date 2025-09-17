// src/components/ChatContainer.jsx
import { useChatLogic } from "../hooks/useChatLogic";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const {
    messages,
    input,
    loading,
    handleSend,
    clearChat,
    updateInput
  } = useChatLogic();

  return (
    <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 pb-8">
      {/* Header del Chat */}
      <div className="w-full max-w-4xl mb-6">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h2 className="text-3xl font-bold text-white mb-2">
              Asistente Virtual
            </h2>
            <p className="text-purple-200 text-lg">
              ¡Pregúntame lo que necesites!
            </p>
          </div>
          
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="ml-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg transition-colors duration-200 text-sm border border-red-500/30"
            >
              Limpiar chat
            </button>
          )}
        </div>
      </div>

      {/* Ventana del chat */}
      <div className="w-full max-w-4xl flex-grow flex flex-col bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <ChatWindow 
          messages={messages} 
          loading={loading} 
        />
      </div>

      {/* Input del chat */}
      <div className="w-full max-w-4xl mt-4">
        <ChatInput
          input={input}
          loading={loading}
          onInputChange={updateInput}
          onSend={handleSend}
        />
      </div>
    </main>
  );
};

export default ChatContainer;