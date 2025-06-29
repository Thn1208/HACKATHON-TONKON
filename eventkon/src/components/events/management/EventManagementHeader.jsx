import PropTypes from 'prop-types';
import { PlusIcon } from '@heroicons/react/24/outline';

const EventManagementHeader = ({ onCreateEvent }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Event Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Create and manage your events, track registrations, and send updates to participants
        </p>
      </div>

      <button
        onClick={onCreateEvent}
        className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        <PlusIcon className="h-5 w-5" />
        Create Event
      </button>
    </div>
  );
};

EventManagementHeader.propTypes = {
  onCreateEvent: PropTypes.func.isRequired
};

export default EventManagementHeader;