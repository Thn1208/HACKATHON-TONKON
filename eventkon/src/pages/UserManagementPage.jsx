import { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import UserManagementHeader from '../components/users/management/UserManagementHeader';
import UserManagementTable from '../components/users/management/UserManagementTable';
import UserManagementFilters from '../components/users/management/UserManagementFilters';

export default function UserManagementPage() {
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
    department: 'all',
    dateJoined: 'all'
  });

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <UserManagementHeader />
        <div className="flex gap-6">
          <UserManagementFilters 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
          <div className="flex-1">
            <UserManagementTable filters={filters} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}