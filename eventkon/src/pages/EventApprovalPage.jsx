import { useState } from 'react';
import Header from '../components/layout/Header';
import ApprovalDashboard from '../components/events/approval/ApprovalDashboard';
import ApprovalTable from '../components/events/approval/ApprovalTable.jsx';
import ApprovalFilters from '../components/events/approval/ApprovalFilters';
import ApprovalDetailsModal from '../components/events/approval/ApprovalDetailsModal';

const EventApprovalPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filters, setFilters] = useState({
    status: 'pending',
    type: 'all',
    date: 'all',
    department: 'all'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 pt-24">
        <ApprovalDashboard />
        
        <div className="mt-8 flex gap-8">
          <ApprovalFilters 
            filters={filters}
            onFiltersChange={setFilters}
          />
          
          <div className="flex-1">
            <ApprovalTable 
              filters={filters} 
              onViewDetails={setSelectedEvent}
            />
          </div>
        </div>
      </main>

      <ApprovalDetailsModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
};

export default EventApprovalPage;