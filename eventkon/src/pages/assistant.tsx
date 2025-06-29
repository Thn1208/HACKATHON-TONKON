import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockEvents } from '../data/mockEvents';
import EventkonLogo from '../components/common/EventkonLogo';
import { PaperAirplaneIcon, SparklesIcon, CalendarIcon, UserIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Header from '../components/layout/Header';

const AssistantPage = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: `Xin chào ${currentUser?.fullName || 'bạn'}! 👋 Tôi là AI Assistant của EventKON, sẵn sàng giúp bạn tìm kiếm sự kiện phù hợp và quản lý lịch trình của mình. Bạn có thể hỏi tôi về:
      
🎯 **Gợi ý sự kiện** dựa trên sở thích và lịch học
📅 **Kiểm tra xung đột lịch** với các sự kiện
📊 **Thống kê** sự kiện đã tham gia
🔍 **Tìm kiếm** sự kiện theo tiêu chí cụ thể

Bạn muốn tôi giúp gì hôm nay?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  // AI Logic để phân tích và đưa ra gợi ý
  const analyzeUserPreferences = () => {
    if (!currentUser) return null;

    const userInterests = currentUser.interests || [];
    const userSchedule = currentUser.schedule || [];
    const userEventHistory = currentUser.eventHistory || [];
    const userMajor = currentUser.major || '';

    // Phân tích sở thích từ event history
    const attendedEvents = userEventHistory.map(history => {
      const event = mockEvents.find(e => e.id === history.eventId);
      return event;
    }).filter(Boolean);

    const interestScores = {};
    attendedEvents.forEach(event => {
      event.tags.forEach(tag => {
        interestScores[tag] = (interestScores[tag] || 0) + 1;
      });
    });

    // Kết hợp với sở thích đã khai báo
    userInterests.forEach(interest => {
      interestScores[interest] = (interestScores[interest] || 0) + 2;
    });

    return {
      interests: interestScores,
      schedule: userSchedule,
      major: userMajor,
      attendedEvents: attendedEvents
    };
  };

  const getRecommendedEvents = (userPrefs) => {
    if (!userPrefs) return [];
    const today = new Date();
    const recommendations = mockEvents
      .filter(event => {
        // Chỉ lấy sự kiện tương lai
        if (new Date(event.date) < today) return false;
        // Kiểm tra đã tham gia chưa
        const hasAttended = userPrefs.attendedEvents.some(attended => attended.id === event.id);
        if (hasAttended) return false;
        // Tính điểm phù hợp
        let score = 0;
        event.tags.forEach(tag => {
          if (userPrefs.interests[tag]) {
            score += userPrefs.interests[tag];
          }
        });
        // Bonus cho chuyên ngành liên quan
        if (userPrefs.major && event.category.toLowerCase().includes(userPrefs.major.toLowerCase())) {
          score += 3;
        }
        return score > 0;
      })
      .map(event => {
        let score = 0;
        event.tags.forEach(tag => {
          if (userPrefs.interests[tag]) {
            score += userPrefs.interests[tag];
          }
        });
        if (userPrefs.major && event.category.toLowerCase().includes(userPrefs.major.toLowerCase())) {
          score += 3;
        }
        return { ...event, score };
      })
      .sort((a: any, b: any) => (b.score as number) - (a.score as number))
      .slice(0, 5);
    return recommendations;
  };

  const checkScheduleConflicts = (event, userSchedule) => {
    if (!userSchedule || userSchedule.length === 0) return [];

    const eventDate = new Date(event.date);
    const eventStartTime = event.startTime;
    const eventEndTime = event.endTime;

    const conflicts = userSchedule.filter(classItem => {
      const dayMap = {
        'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 
        'friday': 5, 'saturday': 6, 'sunday': 0
      };

      const classDay = dayMap[classItem.day];
      const eventDay = eventDate.getDay();

      if (classDay === eventDay) {
        // Kiểm tra xung đột thời gian
        const classStart = classItem.startTime;
        const classEnd = classItem.endTime;

        return (
          (eventStartTime >= classStart && eventStartTime < classEnd) ||
          (eventEndTime > classStart && eventEndTime <= classEnd) ||
          (eventStartTime <= classStart && eventEndTime >= classEnd)
        );
      }

      return false;
    });

    return conflicts;
  };

  const generateAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    const today = new Date();
    const events = mockEvents.filter(e => new Date(e.date) >= today);
    const context = `Hôm nay là ngày ${today.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. Danh sách sự kiện sắp tới tại FPTU:\n` +
      events.map(e => `- ${e.title} (${e.date}, ${e.startTime}-${e.endTime}, ${e.location})`).join('\n');
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const aiResponse = await generateAIResponse(inputMessage);
    
    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleQuickAction = (action) => {
    setInputMessage(action);
  };

  const quickActions = [
    { text: 'Gợi ý sự kiện', icon: '🎯' },
    { text: 'Kiểm tra lịch học', icon: '📚' },
    { text: 'Xem sở thích', icon: '🏷️' },
    { text: 'Thống kê cá nhân', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <EventkonLogo className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">AI Assistant</h1>
              <p className="text-gray-600">Trợ lý thông minh cho sự kiện FPTU</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3xl rounded-2xl px-4 py-3 ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">AI đang suy nghĩ...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.text)}
                  className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 text-sm"
                >
                  <span>{action.icon}</span>
                  <span>{action.text}</span>
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập câu hỏi của bạn..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                <span>Gửi</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        {currentUser && (
          <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{currentUser.fullName}</h3>
                <p className="text-sm text-gray-600">{currentUser.role === 'student' ? 'Sinh viên' : currentUser.role === 'host' ? 'CLB/Host' : 'Admin'}</p>
                {currentUser.major && (
                  <p className="text-sm text-gray-500">{currentUser.major}</p>
                )}
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{currentUser.schedule?.length || 0} lớp học</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <SparklesIcon className="w-4 h-4" />
                    <span>{currentUser.interests?.length || 0} sở thích</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantPage;