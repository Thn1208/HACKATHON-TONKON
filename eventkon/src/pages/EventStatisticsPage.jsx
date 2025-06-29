import { useState } from 'react';
import Header from '../components/layout/Header';
import StatisticsHeader from '../components/statistics/StatisticsHeader';
import StatisticsOverview from '../components/statistics/StatisticsOverview';
import StatisticsCharts from '../components/statistics/StatisticsCharts';
import StatisticsFilters from '../components/statistics/StatisticsFilters';
import StatisticsExport from '../components/statistics/StatisticsExport';

const EventStatisticsPage = () => {
  const [filters, setFilters] = useState({
    dateRange: 'month',
    eventType: 'all',
    organizingClub: 'all',
    location: 'all'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 pt-24">
        <StatisticsHeader />
        
        <div className="mt-8 flex gap-8">
          <div className="w-64 shrink-0">
            <StatisticsFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
            <div className="mt-4">
              <StatisticsExport />
            </div>
          </div>
          
          <div className="flex-1 space-y-6">
            <StatisticsOverview />
            <StatisticsCharts filters={filters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventStatisticsPage;