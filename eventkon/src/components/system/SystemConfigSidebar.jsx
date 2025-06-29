import PropTypes from 'prop-types';
import { 
  Cog6ToothIcon,
  TagIcon,
  FolderIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

export default function SystemConfigSidebar({ activeSection, onSectionChange }) {
  const sections = [
    { id: 'general', name: 'General Settings', icon: Cog6ToothIcon },
    { id: 'categories', name: 'Event Categories', icon: FolderIcon },
    { id: 'tags', name: 'Event Tags', icon: TagIcon },
    { id: 'ai', name: 'AI Configuration', icon: SparklesIcon },
    { id: 'approval', name: 'Approval Workflow', icon: ClipboardDocumentCheckIcon },
    { id: 'integrations', name: 'Integrations', icon: ArrowsRightLeftIcon },
  ];

  return (
    <nav className="w-64 shrink-0">
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium ${
                activeSection === section.id
                ? 'bg-orange-50 text-orange-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              {section.name}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

SystemConfigSidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func.isRequired
};