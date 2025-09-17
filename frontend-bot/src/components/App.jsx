import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';
import Navbar from './Navbar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4">
        <ChatWindow />
        <ChatInput />
      </main>
    </div>
  );
};
<div className="bg-red-500 text-white p-4">
  Tailwind YA funciona 🚀
</div>


export default App;
