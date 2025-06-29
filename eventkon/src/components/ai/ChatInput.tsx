import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

interface ChatInputProps {
  onSubmit: (input: string) => void;
}

export function ChatInput({ onSubmit }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 outline-none transition-all duration-200"
        placeholder="Type your message here..."
      />
      <button 
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-blue-600 
                 hover:text-blue-700 disabled:text-gray-400 transition-colors duration-200"
        disabled={!input.trim()}
      >
        <PaperAirplaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
}