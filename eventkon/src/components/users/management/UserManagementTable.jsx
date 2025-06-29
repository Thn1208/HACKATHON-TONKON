import PropTypes from 'prop-types';
import { useState } from 'react';
import { 
  PencilIcon, 
  TrashIcon,
  KeyIcon,
  EllipsisHorizontalIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const MOCK_USERS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@university.edu',
    studentId: 'SE150001',
    department: 'Information Technology',
    role: 'Student',
    dateJoined: '2023-09-01',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    studentId: 'SE150002',
    department: 'Business Administration',
    role: 'Event Organizer',
    dateJoined: '2023-08-15',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@university.edu',
    studentId: 'SE150003',
    department: 'Engineering',
    role: 'Student',
    dateJoined: '2023-09-10',
    status: 'pending',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export default function UserManagementTable({ filters }) {
  const [selectedUser, setSelectedUser] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 text-green-700';
      case 'inactive':
        return 'bg-gray-50 text-gray-700';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700';
      case 'suspended':
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
              User
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Date Joined
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
          {MOCK_USERS.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    {user.avatar ? (
                      <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-300" />
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.studentId}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{user.department}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{user.role}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{user.dateJoined}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Edit User"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    title="Reset Password"
                  >
                    <KeyIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    title="Delete User"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button 
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => setSelectedUser(user.id === selectedUser ? null : user.id)}
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
}

UserManagementTable.propTypes = {
  filters: PropTypes.shape({
    status: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    dateJoined: PropTypes.string.isRequired
  }).isRequired
};