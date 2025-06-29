import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/outline';

const EventCard = ({ event, showScore = false, disableRegister = false, isPast = false }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Công nghệ': 'bg-primary/10 text-primary',
      'Kỹ năng mềm': 'bg-black/10 text-black',
      'Cuộc thi': 'bg-primary/20 text-primary',
      'Việc làm': 'bg-black/10 text-black',
      'Thiết kế': 'bg-primary/10 text-primary',
      'Họp nhóm': 'bg-black/10 text-black'
    };
    return colors[category] || 'bg-black/10 text-black';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'event': '🎉',
      'workshop': '🔧',
      'meeting': '👥',
      'class': '📚',
      'seminar': '🎓',
      'competition': '🏆'
    };
    return icons[type] || '📅';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRegistrationProgress = () => {
    if (!event.maxParticipants) return 0;
    return (event.currentParticipants / event.maxParticipants) * 100;
  };

  const isRegistrationFull = () => {
    return event.maxParticipants && event.currentParticipants >= event.maxParticipants;
  };

  const isRegistrationDeadlinePassed = () => {
    if (!event.registrationDeadline) return false;
    return new Date(event.registrationDeadline) < new Date();
  };

  const isPastEvent = new Date(event.date) < new Date();
  const isDisabled = isPastEvent || isRegistrationDeadlinePassed() || disableRegister;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
        </div>

        {/* Type Icon */}
        <div className="absolute top-3 right-3">
          <span className="text-2xl">{getTypeIcon(event.type)}</span>
        </div>

        {/* Score Badge */}
        {showScore && event.score && (
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center space-x-1 bg-white bg-opacity-90 px-2 py-1 rounded-full">
              <SparklesIcon className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">{event.score}</span>
            </div>
          </div>
        )}

        {/* Registration Status */}
        <div className="absolute bottom-3 left-3">
          {isDisabled ? (
            <span className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs font-medium">Không thể đăng ký</span>
          ) : (
            <button className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">Đăng ký</button>
          )}
        </div>

        {isPast && (
          <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">Đã diễn ra</span>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4" />
            <span className="truncate">{event.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <UserIcon className="w-4 h-4" />
            <span>{event.organizer}</span>
          </div>
        </div>

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
            {event.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{event.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Registration Progress */}
        {event.maxParticipants && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Đăng ký</span>
              <span>{event.currentParticipants}/{event.maxParticipants}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  getRegistrationProgress() >= 80 ? 'bg-red-500' :
                  getRegistrationProgress() >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${getRegistrationProgress()}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/events/${event.id}`}
          className="block w-full text-center bg-gradient-to-r from-primary to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-primary hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          {isDisabled ? 'Xem chi tiết' : 'Đăng ký ngay'}
        </Link>
      </div>
    </div>
  );
};

export default EventCard;