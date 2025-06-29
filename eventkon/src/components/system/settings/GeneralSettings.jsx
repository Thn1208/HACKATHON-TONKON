export default function GeneralSettings() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
      
      <div className="mt-6 space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            placeholder="30"
          />
          <p className="mt-1 text-sm text-gray-500">
            Time before an inactive user is automatically logged out
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Maximum File Upload Size (MB)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
            placeholder="10"
          />
          <p className="mt-1 text-sm text-gray-500">
            Maximum allowed size for file uploads (images, documents)
          </p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Notification Threshold</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
          >
            <option value="immediate">Immediate</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
          <p className="mt-1 text-sm text-gray-500">
            How often to send notification digests to users
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}