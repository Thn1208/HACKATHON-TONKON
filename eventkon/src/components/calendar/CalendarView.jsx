import PropTypes from 'prop-types';
import MonthView from './views/MonthView';
import WeekView from './views/WeekView';
import DayView from './views/DayView';

const CalendarView = ({ view, date, events, filters }) => {
  const filteredEvents = events.filter(event => {
    // Kiểm tra filter theo type
    if (event.type === 'event' && !filters.events) return false;
    if (event.type === 'class' && !filters.classes) return false;
    if (event.type === 'workshop' && !filters.workshops) return false;
    if (event.type === 'meeting' && !filters.meetings) return false;
    return true;
  });

  return (
    <div className="mt-6 rounded-lg border border-gray-200 bg-white shadow-sm">
      {view === 'month' && (
        <MonthView date={date} events={filteredEvents} />
      )}
      {view === 'week' && (
        <WeekView date={date} events={filteredEvents} />
      )}
      {view === 'day' && (
        <DayView date={date} events={filteredEvents} />
      )}
    </div>
  );
};

CalendarView.propTypes = {
  view: PropTypes.oneOf(['month', 'week', 'day']).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string,
  })).isRequired,
  filters: PropTypes.shape({
    events: PropTypes.bool.isRequired,
    classes: PropTypes.bool.isRequired,
    workshops: PropTypes.bool.isRequired,
    meetings: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CalendarView;