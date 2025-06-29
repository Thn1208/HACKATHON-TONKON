import PropTypes from 'prop-types';

const EventManagementFilters = ({ filters, onFiltersChange }) => {
  return (
    <div className="w-64 shrink-0">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-gray-900">Filters</h2>
        
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              value={filters.status}
              onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Event Type</label>
            <select
              value={filters.type}
              onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Types</option>
              <option value="competition">Competition</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="seminar">Seminar</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Date Range</label>
            <select
              value={filters.date}
              onChange={(e) => onFiltersChange({ ...filters, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

EventManagementFilters.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired
};

export default EventManagementFilters;