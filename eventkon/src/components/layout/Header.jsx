import { useLocation, Link } from 'react-router-dom';
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import EventkonLogo from '../common/EventkonLogo';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to events page with search query
      window.location.href = `/events?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-black shadow-sm border-b border-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <EventkonLogo className="h-8 w-auto" />
        
        {/* Search Bar - Only show on home page */}
        {location.pathname === '/' && (
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sự kiện..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        )}
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/events" 
            className={`transition-colors duration-200 ${location.pathname === '/events' ? 'text-primary font-medium' : 'text-white hover:text-primary'}`}
          >
            Sự kiện
          </Link>
          <Link 
            to="/calendar" 
            className={`transition-colors duration-200 ${location.pathname === '/calendar' ? 'text-primary font-medium' : 'text-white hover:text-primary'}`}
          >
            Lịch
          </Link>
          <Link 
            to="/assistant" 
            className={`transition-colors duration-200 ${location.pathname === '/assistant' ? 'text-primary font-medium' : 'text-white hover:text-primary'}`}
          >
            AI Assistant
          </Link>
          
          {/* Conditional navigation based on user role */}
          {currentUser && currentUser.role === 'host' && (
            <>
              <Link 
                to="/manage-events" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/manage-events' ? 'text-primary font-medium' : 'text-white hover:text-primary'
                }`}
              >
                Quản lý sự kiện
              </Link>
              <Link 
                to="/statistics" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/statistics' ? 'text-primary font-medium' : 'text-white hover:text-primary'
                }`}
              >
                Thống kê
              </Link>
            </>
          )}
          
          {currentUser && currentUser.role === 'admin' && (
            <>
              <Link 
                to="/approve-events" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/approve-events' ? 'text-primary font-medium' : 'text-white hover:text-primary'
                }`}
              >
                Phê duyệt
              </Link>
              <Link 
                to="/manage-users" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/manage-users' ? 'text-primary font-medium' : 'text-white hover:text-primary'
                }`}
              >
                Quản lý người dùng
              </Link>
              <Link 
                to="/system-config" 
                className={`transition-colors duration-200 ${
                  location.pathname === '/system-config' ? 'text-primary font-medium' : 'text-white hover:text-primary'
                }`}
              >
                Cấu hình
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/profile" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.fullName}
                  className="h-8 w-8 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-colors duration-200"
                />
                <span className="hidden sm:block font-medium">{currentUser.fullName}</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;