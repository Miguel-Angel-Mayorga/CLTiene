const ChatInput = ({ input, setInput, onSend }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <div className="flex mt-4 space-x-2 w-full max-w-xl mx-auto">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Escribe algo..."
        className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
      />
      <button
        onClick={onSend}
        className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition"
      >
        Enviar
      </button>
    </div>
  );
};
