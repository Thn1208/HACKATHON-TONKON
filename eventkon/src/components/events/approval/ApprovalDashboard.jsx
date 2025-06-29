import { ClockIcon, CheckCircleIcon, XCircleIcon, InboxIcon } from '@heroicons/react/24/outline';

const ApprovalDashboard = () => {
  const stats = [
    { id: 1, name: 'Pending Approval', value: '12', icon: ClockIcon, color: 'bg-yellow-50 text-yellow-700' },
    { id: 2, name: 'Approved Today', value: '8', icon: CheckCircleIcon, color: 'bg-green-50 text-green-700' },
    { id: 3, name: 'Rejected Today', value: '3', icon: XCircleIcon, color: 'bg-red-50 text-red-700' },
    { id: 4, name: 'Total Submissions', value: '45', icon: InboxIcon, color: 'bg-blue-50 text-blue-700' }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Event Approval Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">
        Review and manage event submissions from organizers
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.id} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow">
            <div className="flex items-center">
              <div className={`rounded-md p-2 ${stat.color}`}>
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="ml-4">
                <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApprovalDashboard;