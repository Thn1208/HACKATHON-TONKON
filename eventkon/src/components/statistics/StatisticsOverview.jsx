import { UsersIcon, StarIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const StatisticsOverview = () => {
  const stats = [
    {
      id: 1,
      name: 'Total Events',
      value: '156',
      change: '+12%',
      changeType: 'positive',
      icon: CalendarIcon
    },
    {
      id: 2,
      name: 'Total Attendees',
      value: '8,450',
      change: '+25.3%',
      changeType: 'positive',
      icon: UsersIcon
    },
    {
      id: 3,
      name: 'Average Rating',
      value: '4.8',
      change: '+0.3',
      changeType: 'positive',
      icon: StarIcon
    },
    {
      id: 4,
      name: 'Venues Used',
      value: '12',
      change: '+2',
      changeType: 'positive',
      icon: MapPinIcon
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="relative overflow-hidden rounded-lg bg-white p-6 shadow-sm"
        >
          <dt>
            <div className="absolute rounded-md bg-orange-100 p-2">
              <stat.icon className="h-6 w-6 text-orange-600" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className={`ml-2 flex items-baseline text-sm font-semibold ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
};

export default StatisticsOverview;