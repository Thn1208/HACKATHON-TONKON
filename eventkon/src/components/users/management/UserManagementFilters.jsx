import PropTypes from 'prop-types';

export default function UserManagementFilters({ filters, onFiltersChange }) {
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending Approval</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Role</label>
            <select
              value={filters.role}
              onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrator</option>
              <option value="organizer">Event Organizer</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty Member</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Department</label>
            <select
              value={filters.department}
              onChange={(e) => onFiltersChange({ ...filters, department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Departments</option>
              <option value="it">Information Technology</option>
              <option value="business">Business Administration</option>
              <option value="engineering">Engineering</option>
              <option value="arts">Arts & Design</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Date Joined</label>
            <select
              value={filters.dateJoined}
              onChange={(e) => onFiltersChange({ ...filters, dateJoined: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

UserManagementFilters.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    dateJoined: PropTypes.string.isRequired
  }).isRequired,
  onFiltersChange: PropTypes.func.isRequired
};