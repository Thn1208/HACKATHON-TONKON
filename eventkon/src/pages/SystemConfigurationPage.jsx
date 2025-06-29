import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import SystemConfigHeader from '../components/system/SystemConfigHeader';
import SystemConfigSidebar from '../components/system/SystemConfigSidebar';
import GeneralSettings from '../components/system/settings/GeneralSettings';
import CategorySettings from '../components/system/settings/CategorySettings.jsx';
import TagSettings from '../components/system/settings/TagSettings';
import AISettings from '../components/system/settings/AISettings';
import ApprovalSettings from '../components/system/settings/ApprovalSettings';
import IntegrationSettings from '../components/system/settings/IntegrationSettings';

export default function SystemConfigurationPage() {
  const [activeSection, setActiveSection] = useState('general');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings />;
      case 'categories':
        return <CategorySettings />;
      case 'tags':
        return <TagSettings />;
      case 'ai':
        return <AISettings />;
      case 'approval':
        return <ApprovalSettings />;
      case 'integrations':
        return <IntegrationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SystemConfigHeader />
          <div className="mt-8 flex gap-8">
            <SystemConfigSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
            <div className="flex-1">{renderActiveSection()}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}