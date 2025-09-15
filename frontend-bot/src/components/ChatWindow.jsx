const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="mb-4 mx-auto max-w-xl w-full bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`max-w-[80%] px-4 py-2 rounded-lg text-sm ${
            msg.sender === "user"
              ? "bg-blue-100 self-end text-right"
              : "bg-gray-100 self-start text-left"
          }`}
        >
          {msg.text}
        </div>
      ))}

      {loading && (
        <div className="text-gray-400 text-sm">Escribiendo...</div>
      )}
    </div>
  );
};
