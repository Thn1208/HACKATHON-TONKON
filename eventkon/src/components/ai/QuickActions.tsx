interface QuickActionsProps {
  onActionSelect: (action: string) => void;
}

export function QuickActions({ onActionSelect }: QuickActionsProps) {
  const quickActions = [
    { label: "Create Event", query: "How do I create a new event?" },
    { label: "Find Events", query: "Show me upcoming events" },
    { label: "Event Guidelines", query: "What are the event guidelines?" },
    { label: "Registration Help", query: "How do I register for an event?" }
  ];

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => onActionSelect(action.query)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-full
                     hover:bg-blue-100 transition-colors duration-200"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}