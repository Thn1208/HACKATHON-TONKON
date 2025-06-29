export default function NotificationsTab() {
  const notifications = [
    {
      id: 1,
      title: 'Event Registration Confirmed',
      message: 'Your registration for Tech Conference 2024 has been confirmed.',
      date: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      title: 'New Event Announcement',
      message: 'Startup Weekend registration is now open.',
      date: '1 day ago',
      unread: false
    }
  ];

  return (
    <div className="space-y-4">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`rounded-lg border ${
            notification.unread ? 'bg-orange-50 border-orange-100' : 'bg-white border-gray-200'
          } p-4 shadow-sm`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{notification.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
            </div>
            <span className="text-xs text-gray-500">{notification.date}</span>
          </div>
        </div>
      ))}
    </div>
  );
}