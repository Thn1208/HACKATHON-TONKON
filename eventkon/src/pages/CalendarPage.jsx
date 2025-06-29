import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import ScheduleManager from '../components/calendar/ScheduleManager';
import CalendarView from '../components/calendar/CalendarView';
import { useAuth } from '../context/AuthContext';

const CalendarPage = () => {
  const { currentUser } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // month, week, day
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isScheduleManagerOpen, setIsScheduleManagerOpen] = useState(false);
  const [filters, setFilters] = useState({
    events: true,
    classes: true,
    workshops: true,
    meetings: true
  });

  useEffect(() => {
    // Mock events data
    const mockEvents = [
      {
        id: 1,
        title: 'Hội thảo AI 2024',
        start: new Date(2024, 0, 15, 14, 0),
        end: new Date(2024, 0, 15, 17, 0),
        location: 'Hội trường A, FPTU',
        type: 'event',
        color: 'blue',
        description: 'Hội thảo về các xu hướng mới nhất trong AI'
      },
      {
        id: 2,
        title: 'Workshop Kỹ năng mềm',
        start: new Date(2024, 0, 18, 9, 0),
        end: new Date(2024, 0, 18, 12, 0),
        location: 'Phòng 205, FPTU',
        type: 'workshop',
        color: 'purple',
        description: 'Workshop phát triển kỹ năng mềm'
      },
      {
        id: 3,
        title: 'Họp CLB Công nghệ',
        start: new Date(2024, 0, 19, 15, 0),
        end: new Date(2024, 0, 19, 16, 30),
        location: 'Phòng họp CLB, FPTU',
        type: 'meeting',
        color: 'orange',
        description: 'Họp định kỳ CLB Công nghệ thông tin'
      },
      {
        id: 4,
        title: 'Seminar Blockchain',
        start: new Date(2024, 0, 22, 14, 0),
        end: new Date(2024, 0, 22, 17, 0),
        location: 'Phòng 301, FPTU',
        type: 'event',
        color: 'blue',
        description: 'Seminar về công nghệ blockchain'
      },
      {
        id: 5,
        title: 'Cuộc thi Hackathon 2024',
        start: new Date(2024, 0, 25, 8, 0),
        end: new Date(2024, 0, 26, 18, 0),
        location: 'Thư viện trung tâm, FPTU',
        type: 'event',
        color: 'blue',
        description: 'Cuộc thi lập trình hackathon'
      },
      {
        id: 6,
        title: 'Ngày hội Việc làm FPTU',
        start: new Date(2024, 1, 5, 8, 0),
        end: new Date(2024, 1, 5, 17, 0),
        location: 'Sân trường FPTU',
        type: 'event',
        color: 'blue',
        description: 'Ngày hội việc làm với các công ty'
      }
    ];

    setEvents(mockEvents);
  }, []);

  // Convert user schedule to calendar events
  const getUserScheduleEvents = () => {
    if (!currentUser?.schedule) return [];

    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() - today.getDay() + 1); // Start of week (Monday)

    return currentUser.schedule.map((classItem, index) => {
      const dayMap = {
        'monday': 1, 'tuesday': 2, 'wednesday': 3, 'thursday': 4, 
        'friday': 5, 'saturday': 6, 'sunday': 0
      };

      const classDate = new Date(currentWeek);
      classDate.setDate(currentWeek.getDate() + dayMap[classItem.day] - 1);

      const [startHour, startMinute] = classItem.startTime.split(':').map(Number);
      const [endHour, endMinute] = classItem.endTime.split(':').map(Number);

      const startTime = new Date(classDate);
      startTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date(classDate);
      endTime.setHours(endHour, endMinute, 0, 0);

      return {
        id: `class_${classItem.id}`,
        title: classItem.title,
        start: startTime,
        end: endTime,
        location: classItem.location,
        type: 'class',
        color: 'green',
        description: `Lớp học với ${classItem.instructor}`,
        instructor: classItem.instructor
      };
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add previous month days
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        events: getEventsForDate(prevDate)
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        events: getEventsForDate(currentDate)
      });
    }
    
    // Add next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        events: getEventsForDate(nextDate)
      });
    }
    
    return days;
  };

  const getEventsForDate = (date) => {
    const allEvents = [...events, ...getUserScheduleEvents()];
    return allEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString() && filters[event.type];
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMonthName = (date) => {
    return date.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
  };

  const goToPreviousPeriod = () => {
    switch (view) {
      case 'month':
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        break;
      case 'week':
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
        break;
      case 'day':
        const prevDay = new Date(currentDate);
        prevDay.setDate(currentDate.getDate() - 1);
        setCurrentDate(prevDay);
        break;
    }
  };

  const goToNextPeriod = () => {
    switch (view) {
      case 'month':
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        break;
      case 'week':
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
        break;
      case 'day':
        const nextDay = new Date(currentDate);
        nextDay.setDate(currentDate.getDate() + 1);
        setCurrentDate(nextDay);
        break;
    }
  };

  const getViewTitle = () => {
    switch (view) {
      case 'month':
        return getMonthName(currentDate);
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - ((currentDate.getDay() + 6) % 7));
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `${startOfWeek.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' })} - ${endOfWeek.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' })}`;
      case 'day':
        return currentDate.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      default:
        return getMonthName(currentDate);
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventColor = (type) => {
    const colors = {
      event: 'bg-blue-500 border-blue-600',
      class: 'bg-green-500 border-green-600',
      workshop: 'bg-purple-500 border-purple-600',
      meeting: 'bg-orange-500 border-orange-600'
    };
    return colors[type] || 'bg-gray-500 border-gray-600';
  };

  const getEventIcon = (type) => {
    const icons = {
      event: '🎉',
      class: '📚',
      workshop: '🔧',
      meeting: '👥'
    };
    return icons[type] || '📅';
  };

  const handleFilterChange = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Calendar Header */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 mb-6 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {getViewTitle()}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={goToPreviousPeriod}
                      className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={goToNextPeriod}
                      className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {currentUser && currentUser.role === 'student' && (
                    <button
                      onClick={() => setIsScheduleManagerOpen(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Quản lý lịch học</span>
                    </button>
                  )}
                  
                  <button
                    onClick={goToToday}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                  >
                    Hôm nay
                  </button>
                  
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setView('month')}
                      className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
                        view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Tháng
                    </button>
                    <button
                      onClick={() => setView('week')}
                      className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
                        view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Tuần
                    </button>
                    <button
                      onClick={() => setView('day')}
                      className={`px-3 py-1 text-sm font-medium rounded transition-all duration-200 ${
                        view === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Ngày
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-6">
                <span className="text-sm font-medium text-gray-700">Hiển thị:</span>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.events}
                      onChange={() => handleFilterChange('events')}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Sự kiện</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.classes}
                      onChange={() => handleFilterChange('classes')}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Lịch học</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.workshops}
                      onChange={() => handleFilterChange('workshops')}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">Workshop</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.meetings}
                      onChange={() => handleFilterChange('meetings')}
                      className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700">Họp</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-6">
            <CalendarView
              view={view}
                date={currentDate}
                events={[...events, ...getUserScheduleEvents()]}
              filters={filters}
            />
            </div>
          </div>

          {/* Sidebar - Upcoming Events */}
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              {/* Calendar content */}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sự kiện sắp tới
                </h3>
                
                <div className="space-y-3">
                  {[...events, ...getUserScheduleEvents()]
                    .filter(event => new Date(event.start) > new Date() && filters[event.type])
                    .sort((a, b) => new Date(a.start) - new Date(b.start))
                    .slice(0, 5)
                    .map((event) => (
                      <div key={event.id} className={`border-l-4 pl-3 py-2 rounded-r-lg ${getEventColor(event.type)} bg-opacity-10`}>
                        <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                          <span>{getEventIcon(event.type)}</span>
                          <span>{event.title}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(event.start).toLocaleDateString('vi-VN')} - {event.location}
                        </div>
                      </div>
                    ))}
                </div>
                
                {currentUser && currentUser.schedule && currentUser.schedule.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">
                      Lịch học của bạn
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      {currentUser.schedule.slice(0, 3).map((classItem) => (
                        <div key={classItem.id} className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>{classItem.title}</span>
                        </div>
                      ))}
                      {currentUser.schedule.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{currentUser.schedule.length - 3} lớp học khác
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Manager Modal */}
      <ScheduleManager 
        isOpen={isScheduleManagerOpen}
        onClose={() => setIsScheduleManagerOpen(false)}
      />
    </div>
  );
};

export default CalendarPage;