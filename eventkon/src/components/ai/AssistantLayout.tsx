import { useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatResponse } from './ChatResponse';
import { QuickActions } from './QuickActions';
import { ConversationHeader } from './ConversationHeader';

export default function AssistantLayout() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (input: string) => {
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { type: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <ConversationHeader />
      
      <div className="h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message, index) => (
            <ChatResponse 
              key={index}
              type={message.type}
              content={message.content}
            />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 p-6">
          <QuickActions onActionSelect={handleSubmit} />
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}