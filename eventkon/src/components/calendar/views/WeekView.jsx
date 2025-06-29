import React from 'react';
import PropTypes from 'prop-types';

const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function getDayIndex(date) {
  // Monday = 0, Sunday = 6
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

function getHour(date) {
  return date.getHours();
}

const getEventColor = (type) => {
  const colors = {
    event: 'bg-orange-500 text-white',
    class: 'bg-black text-white',
    workshop: 'bg-orange-600 text-white',
    meeting: 'bg-gray-700 text-white'
  };
  return colors[type] || 'bg-gray-500 text-white';
};

const WeekView = ({ date, events }) => {
  // Tìm ngày đầu tuần (thứ 2)
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7));

  // Tạo lưới 7x24
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-16 bg-gray-50 border-b border-gray-200"></th>
            {days.map((d, i) => {
              const dayDate = new Date(startOfWeek);
              dayDate.setDate(startOfWeek.getDate() + i);
              const isToday = dayDate.toDateString() === new Date().toDateString();
              
              return (
                <th key={i} className={`text-center font-semibold text-gray-700 py-3 bg-gray-50 border-b border-gray-200 ${
                  isToday ? 'bg-orange-50 text-orange-700' : ''
                }`}>
                  <div className="text-sm font-medium">{d}</div>
                  <div className="text-xs text-gray-500">{dayDate.getDate()}</div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour, rowIdx) => (
            <tr key={hour}>
              <td className="text-xs text-gray-400 pr-2 align-top pt-2 w-16 bg-gray-50 border-r border-gray-200">{hour}</td>
              {days.map((_, colIdx) => {
                // Tính ngày hiện tại của cell
                const cellDate = new Date(startOfWeek);
                cellDate.setDate(startOfWeek.getDate() + colIdx);
                cellDate.setHours(rowIdx, 0, 0, 0);
                // Tìm event/lịch học bắt đầu tại giờ này
                const cellEvents = events.filter(ev => {
                  return (
                    getDayIndex(ev.start) === colIdx &&
                    getHour(ev.start) === rowIdx
                  );
                });
                return (
                  <td key={colIdx} className="relative h-12 border-b border-r border-gray-200 align-top">
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
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

WeekView.propTypes = {
  date: PropTypes.any,
  events: PropTypes.array
};

export default WeekView;