import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon,
  EllipsisHorizontalIcon,
  UserGroupIcon,
  BellIcon 
} from '@heroicons/react/24/outline';

const MOCK_EVENTS = [
  {
    id: '1',
    title: 'English Speaking Competition',
    type: 'Competition',
    date: '2024-01-15',
    time: '09:00 AM',
    location: 'Main Auditorium',
    capacity: 200,
    registered: 150,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'The Money Verse',
    type: 'Workshop',
    date: '2024-01-20',
    time: '02:00 PM',
    location: 'Room 301',
    capacity: 50,
    registered: 45,
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'TEDx FPTUHCMC',
    type: 'Conference',
    date: '2024-02-01',
    time: '10:00 AM',
    location: 'Innovation Hub',
    capacity: 300,
    registered: 275,
    status: 'upcoming'
  }
];

const EventManagementTable = ({ filters }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-50 text-blue-700';
      case 'ongoing':
        return 'bg-green-50 text-green-700';
      case 'completed':
        return 'bg-gray-50 text-gray-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Event Details
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date & Time
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Location
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Registration
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {MOCK_EVENTS.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-gray-900">{event.title}</div>
                  <div className="text-sm text-gray-500">{event.type}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{event.date}</div>
                <div className="text-sm text-gray-500">{event.time}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{event.location}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">
                  {event.registered} / {event.capacity}
                </div>
                <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200">
                  <div 
                    className="h-1.5 rounded-full bg-orange-500" 
                    style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                  />
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Manage Participants"
                  >
                    <UserGroupIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Send Notification"
                  >
                    <BellIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Edit Event"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    title="Delete Event"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
                  >
                    <EllipsisHorizontalIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EventManagementTable.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

export default EventManagementTable;