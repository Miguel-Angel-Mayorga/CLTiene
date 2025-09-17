import botImage from "../assets/Avatar 1.png";
import ChatInput from "../components/ChatInput";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";
import { useChatLogic } from "../hooks/useChatLogic";

const Chat = () => {
  const {
    messages,
    input,
    loading,
    handleSend,
    updateInput
  } = useChatLogic();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow flex px-4 pt-16">
        {/* IMAGEN DEL BOT - IZQUIERDA */}
        <div className="w-1/3 flex items-center justify-center p-8">
          <img 
            src={botImage} 
            alt="Asistente CLTIENE" 
            className="w-full max-w-md object-contain"
          />
        </div>
        
        {/* CONTENEDOR DERECHO */}
        <div className="w-2/3 flex flex-col">
          {/* CHATWindow */}
          <ChatWindow messages={messages} loading={loading} />
          
          {/* INPUT PEGADO - QUITA mt-auto */}
          <div className="w-full max-w-2xl mx-auto">
            <ChatInput
              input={input}
              loading={loading}
              onInputChange={updateInput}
              onSend={handleSend}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;