const ChatWindow = ({ messages, loading }) => {
  return (
    <div className="flex-1 p-6">
      {/* CONTENEDOR CON ALTURA MÁXIMA Y SCROLL */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg h-full max-h-[70vh] overflow-hidden flex flex-col">
        
        {/* CABECERA FIJA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 shrink-0">
          <h3 className="text-white font-semibold">Asistente Virtual CLTIENE</h3>
        </div>
        
        {/* ÁREA DE MENSAJES CON SCROLL (LO MÁS IMPORTANTE) */}
        <div className="flex-1 overflow-y-auto p-6 min-h-0"> {/* ← min-h-0 es CLAVE */}
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Te damos la bienvenida al servicio de ayuda de CLTIENE
                </h2>
                <p className="text-gray-600">¿En qué podemos ayudarte?</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* ESTADO DE CARGA (ABAJO) */}
        {loading && (
          <div className="px-6 pb-4 shrink-0"> {/* ← shrink-0 para que no se comprima */}
            <div className="bg-gray-100 text-gray-600 px-4 py-3 rounded-xl border border-gray-200 flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-sm">El asistente está escribiendo...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;