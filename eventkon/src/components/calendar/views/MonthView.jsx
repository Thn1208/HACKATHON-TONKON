import React from 'react';
import PropTypes from 'prop-types';

const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function getDayIndex(date) {
  // Monday = 0, Sunday = 6
  const d = date.getDay();
  return d === 0 ? 6 : d - 1;
}

function getMonthDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startIdx = getDayIndex(firstDay);
  const totalCells = Math.ceil((startIdx + daysInMonth) / 7) * 7;
  const daysArr = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startIdx + 1;
    daysArr.push(dayNum > 0 && dayNum <= daysInMonth ? new Date(year, month, dayNum) : null);
  }
  return daysArr;
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

const MonthView = ({ date, events }) => {
  const monthDays = getMonthDays(date);
  const today = new Date();
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {days.map((d, i) => (
              <th key={i} className="text-center font-semibold text-gray-700 py-3 bg-gray-50 border-b border-gray-200">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: monthDays.length / 7 }).map((_, rowIdx) => (
            <tr key={rowIdx}>
              {monthDays.slice(rowIdx * 7, rowIdx * 7 + 7).map((day, colIdx) => {
                const dayEvents = events.filter(ev => day && ev.start.toDateString() === day.toDateString());
                const isToday = day && day.toDateString() === today.toDateString();
                const isCurrentMonth = day && day.getMonth() === date.getMonth();
                
                return (
                  <td key={colIdx} className="align-top h-32 min-h-[8rem] max-h-32 border-b border-r border-gray-200 p-2">
                    <div className={`text-sm font-medium mb-2 ${
                      !isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                    } ${
                      isToday ? 'text-orange-600 font-bold bg-orange-50 rounded-full w-6 h-6 flex items-center justify-center' : ''
                    }`}>
                      {day ? day.getDate() : ''}
                    </div>
                    <div className="space-y-1 overflow-hidden" style={{maxHeight: '80px'}}>
                      {dayEvents.slice(0, 3).map(ev => (
                        <div
                          key={ev.id}
                          className={`px-2 py-1 rounded text-xs font-medium truncate shadow-sm ${getEventColor(ev.type)}`}
                          title={`${ev.title} - ${ev.location || ''}`}
                        >
                          {ev.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          +{dayEvents.length - 3} sự kiện khác
                        </div>
                      )}
                    </div>
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

MonthView.propTypes = {
  date: PropTypes.any,
  events: PropTypes.array
};

export default MonthView;