import PropTypes from 'prop-types';

export default function ProfileTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'personal', label: 'Personal Information' },
    { id: 'events', label: 'Event History' },
    { id: 'notifications', label: 'Notifications' }
  ];

  return (
    <div className="mt-6 border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
              ${activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

ProfileTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
};