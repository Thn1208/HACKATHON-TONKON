import PropTypes from 'prop-types';

const StatisticsFilters = ({ filters, onFiltersChange }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="font-semibold text-gray-900">Filters</h2>
      
      <div className="mt-4 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Event Type</label>
          <select
            value={filters.eventType}
            onChange={(e) => onFiltersChange({ ...filters, eventType: e.target.value })}
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
          <label className="text-sm font-medium text-gray-700">Organizing Club</label>
          <select
            value={filters.organizingClub}
            onChange={(e) => onFiltersChange({ ...filters, organizingClub: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          >
            <option value="all">All Clubs</option>
            <option value="english">English Club</option>
            <option value="technology">Technology Club</option>
            <option value="business">Business Club</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <select
            value={filters.location}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
          >
            <option value="all">All Locations</option>
            <option value="auditorium">Main Auditorium</option>
            <option value="hub">Innovation Hub</option>
            <option value="classroom">Classrooms</option>
          </select>
        </div>
      </div>
    </div>
  );
};

StatisticsFilters.propTypes = {
  filters: PropTypes.shape({
    dateRange: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    organizingClub: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired
};

export default StatisticsFilters;