import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const StatisticsExport = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="font-semibold text-gray-900">Export Data</h2>
      
      <div className="mt-4 space-y-2">
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={() => console.log('Export CSV')}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export as CSV
        </button>
        
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={() => console.log('Export Excel')}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export as Excel
        </button>
        
        <button
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          onClick={() => console.log('Export PDF')}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default StatisticsExport;