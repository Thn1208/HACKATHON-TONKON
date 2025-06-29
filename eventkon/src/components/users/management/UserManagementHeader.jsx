import { PlusIcon } from '@heroicons/react/24/outline';

export default function UserManagementHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage user accounts, roles, and permissions across the platform
        </p>
      </div>

      <button
        className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
      >
        <PlusIcon className="h-5 w-5" />
        Add New User
      </button>
    </div>
  );
}