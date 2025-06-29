import React from 'react';
import PropTypes from 'prop-types';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const getEventColor = (type) => {
  const colors = {
    event: 'bg-orange-500 text-white',
    class: 'bg-black text-white',
    workshop: 'bg-orange-600 text-white',
    meeting: 'bg-gray-700 text-white'
  };
  return colors[type] || 'bg-gray-500 text-white';
};

const DayView = ({ date, events }) => {
  const isToday = date.toDateString() === new Date().toDateString();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-16 bg-gray-50 border-b border-gray-200"></th>
            <th className={`text-center font-semibold text-gray-700 py-3 bg-gray-50 border-b border-gray-200 ${
              isToday ? 'bg-orange-50 text-orange-700' : ''
            }`}>
              {date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
            </th>
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIdx) => {
            // Tìm event/lịch học bắt đầu tại giờ này
            const cellEvents = events.filter(ev => {
              return (
                ev.start.getHours() === rowIdx
              );
            });
            return (
              <tr key={hour}>
                <td className="text-xs text-gray-400 pr-2 align-top pt-2 w-16 bg-gray-50 border-r border-gray-200">{hour}</td>
                <td className="relative h-12 border-b border-r border-gray-200 align-top">
                  {cellEvents.map(ev => {
                    const duration = (ev.end - ev.start) / (1000 * 60 * 60); // hours
                    return (
                      <div
                        key={ev.id}
                        className={`absolute left-0 right-0 px-2 py-1 rounded-lg text-xs font-medium shadow-md ${getEventColor(ev.type)}`}
                        style={{ top: 0, height: `${Math.max(duration * 48, 24)}px`, zIndex: 10 }}
                        title={`${ev.title} - ${ev.location || ''}`}
                      >
                        {ev.title}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

DayView.propTypes = {
  date: PropTypes.any,
  events: PropTypes.array
};

export default DayView;