import React from 'react';
import Navbar from './Navbar';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

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

export default App;
