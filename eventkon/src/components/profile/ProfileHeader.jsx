import { UserCircleIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

export default function ProfileHeader() {
  return (
    <div className="relative">
      <div className="h-32 w-full bg-gradient-to-r from-orange-500 to-orange-600 lg:h-48"></div>
      <div className="relative -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end space-x-5">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white">
            <UserCircleIcon className="h-full w-full text-gray-300" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-end space-x-6 pb-1">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">John Smith</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <AcademicCapIcon className="h-5 w-5" />
                <span>Information Technology • SE150001</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-3">
              <button className="inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}