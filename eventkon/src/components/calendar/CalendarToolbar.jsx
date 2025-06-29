import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, addMonths, addWeeks, addDays } from 'date-fns';

const CalendarToolbar = ({ view, date, onViewChange, onDateChange }) => {
  const handlePrevious = () => {
    switch (view) {
      case 'month':
        onDateChange(addMonths(date, -1));
        break;
      case 'week':
        onDateChange(addWeeks(date, -1));
        break;
      case 'day':
        onDateChange(addDays(date, -1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'month':
        onDateChange(addMonths(date, 1));
        break;
      case 'week':
        onDateChange(addWeeks(date, 1));
        break;
      case 'day':
        onDateChange(addDays(date, 1));
        break;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {format(date, 'MMMM yyyy')}
        </h1>
        <div className="flex items-center rounded-lg border border-gray-300">
          <button
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex rounded-lg border border-gray-300">
        <button
          onClick={() => onViewChange('month')}
          className={`px-4 py-2 text-sm font-medium ${
            view === 'month' 
              ? 'bg-orange-500 text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Month
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`px-4 py-2 text-sm font-medium ${
            view === 'week'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange('day')}
          className={`px-4 py-2 text-sm font-medium ${
            view === 'day'
              ? 'bg-orange-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Day
        </button>
      </div>
    </div>
  );
};

CalendarToolbar.propTypes = {
  view: PropTypes.oneOf(['month', 'week', 'day']).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  onViewChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default CalendarToolbar;