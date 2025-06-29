export default function EventHistoryTab() {
  const events = [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: 'Mar 15, 2024',
      role: 'Participant',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      name: 'Startup Weekend',
      date: 'Feb 28, 2024',
      role: 'Organizer',
      status: 'Completed',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  return (
    <div className="space-y-6">
      {events.map(event => (
        <div
          key={event.id}
          className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              <span>{event.date}</span>
              <span>•</span>
              <span>{event.role}</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
              {event.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}