import { useState } from 'react';
import Header from '../components/layout/Header';
import EventManagementHeader from '../components/events/management/EventManagementHeader';
import EventManagementTable from '../components/events/management/EventManagementTable';
import EventManagementFilters from '../components/events/management/EventManagementFilters';
import CreateEventModal from '../components/events/management/CreateEventModal';

const EventManagementPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    date: 'all'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 pt-24">
        <EventManagementHeader onCreateEvent={() => setIsCreateModalOpen(true)} />
        
        <div className="mt-8 flex gap-8">
          <EventManagementFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <div className="flex-1">
            <EventManagementTable filters={filters} />
          </div>
        </div>
      </main>

      <CreateEventModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default EventManagementPage;