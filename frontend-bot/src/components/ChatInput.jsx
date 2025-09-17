import envio from "../assets/Asset 4@4x.png";
const ChatInput = ({ input, loading, onInputChange, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
      <div className="flex space-x-4">
        <div className="flex-1">
          <input
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            placeholder="Describe lo que necesitas..."
            className="w-full px-6 py-4 bg-gray-50 text-gray-800 placeholder-gray-500 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm disabled:opacity-50"
          />
        </div>
        
        {/* IMAGEN SOLA - SIN CONTENEDOR */}
        <img 
          src={envio} 
          alt="Enviar mensaje" 
          onClick={!input.trim() || loading ? undefined : onSend}
          className={`w-10 h-13 object-contain cursor-pointer transform transition-transform duration-200 hover:scale-110 ${
            !input.trim() || loading
              ? "cursor-not-allowed"
              : "hover:scale-110 cursor-pointer"
          }`}
        />
      </div>
    </div>
  );
};

export default ChatInput;