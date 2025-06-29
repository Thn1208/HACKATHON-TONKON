import { useState } from 'react'
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import EventkonLogo from '../common/EventkonLogo'

export default function Navbar({ onMenuClick }) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className="bg-black shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
              onClick={onMenuClick}
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <EventkonLogo className="h-8 w-auto" />
          </div>

          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search events</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Search events..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}