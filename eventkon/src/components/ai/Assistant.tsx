import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export default function Assistant() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(input);
      const text = await result.response.text();
      setResponse(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    const today = new Date();
    const events = mockEvents.filter(e => new Date(e.date) >= today);
    const context = `Hôm nay là ngày ${today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Danh sách sự kiện sắp tới tại FPTU:\n`
      + events.map(e => `- ${e.title} (${e.date}, ${e.startTime}-${e.endTime}, ${e.location})`).join('\n');
    try {
      const res = await fetch('http://localhost:3001/api/ask-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: context + '\n\nCâu hỏi: ' + userMessage })
      });
      const data = await res.json();
      setIsLoading(false);
      return data.text || 'Không nhận được phản hồi từ Gemini.';
    } catch (error) {
      setIsLoading(false);
      return 'Lỗi khi kết nối Gemini AI. Vui lòng kiểm tra backend hoặc thử lại sau.';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ask me anything..."
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </form>
      {response && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          {response}
        </div>
      )}
    </div>
  );
}