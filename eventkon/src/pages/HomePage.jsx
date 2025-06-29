import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockEvents } from '../data/mockEvents';
import Header from '../components/layout/Header';
import EventCard from '../components/home/EventCard';
import FeaturedEvents from '../components/home/FeaturedEvents';
import { CalendarIcon, UserIcon, MagnifyingGlassIcon, SparklesIcon, ClockIcon, MapPinIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [recommendedEvents, setRecommendedEvents] = useState([]);

  // Phân tích sở thích và đưa ra gợi ý
  const analyzeUserPreferences = () => {
    if (!currentUser) return null;

    const userInterests = currentUser.interests || [];
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
      major: userMajor,
      attendedEvents: attendedEvents
    };
  };

  const getRecommendedEvents = (userPrefs) => {
    if (!userPrefs) return [];

    const recommendations = mockEvents
      .filter(event => {
        // Kiểm tra xem user đã tham gia chưa
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
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);

    return recommendations;
  };

  useEffect(() => {
    const userPrefs = analyzeUserPreferences();
    if (userPrefs) {
      const recommendations = getRecommendedEvents(userPrefs);
      setRecommendedEvents(recommendations);
    }
  }, [currentUser]);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '🎯' },
    { id: 'Công nghệ', name: 'Công nghệ', icon: '💻' },
    { id: 'Kỹ năng mềm', name: 'Kỹ năng mềm', icon: '🎭' },
    { id: 'Cuộc thi', name: 'Cuộc thi', icon: '🏆' },
    { id: 'Việc làm', name: 'Việc làm', icon: '💼' },
    { id: 'Thiết kế', name: 'Thiết kế', icon: '🎨' }
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isUpcomingEvent = (event) => new Date(event.date) >= new Date();
  const upcomingEvents = mockEvents.filter(isUpcomingEvent).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary via-black to-black">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Khám phá sự kiện
                <span className="block text-primary">FPT University</span>
              </h1>
              <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
                Tham gia các sự kiện thú vị, kết nối với cộng đồng và phát triển kỹ năng của bạn
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm sự kiện..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{mockEvents.length}+</div>
                  <div className="text-primary">Sự kiện</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-primary">Người tham gia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-primary">CLB & Tổ chức</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          {currentUser && (
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    className="w-16 h-16 rounded-full border-4 border-primary"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Chào mừng trở lại, {currentUser.fullName}! 👋
                    </h2>
                    <p className="text-gray-600">
                      {currentUser.role === 'student' ? 'Sinh viên' : currentUser.role === 'host' ? 'CLB/Host' : 'Admin'} • {currentUser.major || 'FPT University'}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-center space-x-3 p-4 bg-primary rounded-lg">
                    <CalendarIcon className="w-8 h-8 text-white" />
                    <div>
                      <div className="font-semibold text-gray-900">{currentUser.schedule?.length || 0}</div>
                      <div className="text-sm text-gray-600">Lớp học</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-primary rounded-lg">
                    <SparklesIcon className="w-8 h-8 text-white" />
                    <div>
                      <div className="font-semibold text-gray-900">{currentUser.interests?.length || 0}</div>
                      <div className="text-sm text-gray-600">Sở thích</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 bg-primary rounded-lg">
                    <ClockIcon className="w-8 h-8 text-white" />
                    <div>
                      <div className="font-semibold text-gray-900">{currentUser.eventHistory?.length || 0}</div>
                      <div className="text-sm text-gray-600">Sự kiện đã tham gia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Gợi ý cho bạn Section */}
          <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                <div className="flex items-center mb-6">
                  <SparklesIcon className="w-8 h-8 text-primary mr-2" />
                  <h2 className="text-2xl font-bold text-primary">Gợi ý cho bạn</h2>
                  <Link to="/events" className="ml-auto text-primary font-semibold flex items-center space-x-1">
                    <span>Xem tất cả</span>
                    <ChevronRightIcon className="w-5 h-5" />
                  </Link>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedEvents.map((event) => (
                    <EventCard key={event.id} event={event} showScore={true} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Events */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="w-8 h-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Sự kiện nổi bật
                </h2>
              </div>
              <Link
                to="/events"
                className="text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
              >
                <span>Xem tất cả</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <FeaturedEvents events={upcomingEvents.slice(0,3)} />
          </div>

          {/* Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Khám phá theo danh mục</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-white hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Events */}
          {searchTerm || selectedCategory !== 'all' ? (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Kết quả tìm kiếm ({filteredEvents.length})
                </h2>
                {(searchTerm || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </div>
              
              {filteredEvents.filter(isUpcomingEvent).length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.filter(isUpcomingEvent).map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sự kiện</h3>
                  <p className="text-gray-600 mb-6">
                    Thử thay đổi từ khóa tìm kiếm hoặc danh mục khác
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Xem tất cả sự kiện
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* All Events Preview */
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tất cả sự kiện</h2>
                <Link
                  to="/events"
                  className="text-primary hover:text-primary-700 font-medium flex items-center space-x-1"
                >
                  <span>Xem tất cả</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockEvents.filter(isUpcomingEvent).slice(0, 6).map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng tham gia?</h2>
            <p className="text-xl mb-6 opacity-90">
              Khám phá các sự kiện thú vị và kết nối với cộng đồng FPTU
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/events"
                className="px-8 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 border border-primary"
              >
                Xem tất cả sự kiện
              </Link>
              <Link
                to="/assistant"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors duration-200"
              >
                Hỏi AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 