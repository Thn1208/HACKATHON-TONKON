import PropTypes from 'prop-types';

const CalendarSidebar = ({ filters, onFiltersChange }) => {
  return (
    <div className="w-64 shrink-0">
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        
        <div className="mt-4 space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.academic}
              onChange={(e) => onFiltersChange({
                ...filters,
                academic: e.target.checked
              })}
              className="h-4 w-4 rounded border-gray-300 text-orange-500"
            />
            <span className="text-sm text-gray-700">Academic Classes</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.events}
              onChange={(e) => onFiltersChange({
                ...filters,
                events: e.target.checked
              })}
              className="h-4 w-4 rounded border-gray-300 text-orange-500"
            />
            <span className="text-sm text-gray-700">Events</span>
          </label>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900">Priority</h3>
          <select
            value={filters.priority}
            onChange={(e) => onFiltersChange({
              ...filters,
              priority: e.target.value
            })}
            className="mt-2 w-full rounded-md border-gray-300 text-sm"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

CalendarSidebar.propTypes = {
  filters: PropTypes.shape({
    academic: PropTypes.bool.isRequired,
    events: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired,
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired,
};

export default CalendarSidebar;