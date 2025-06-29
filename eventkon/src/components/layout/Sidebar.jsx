import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EventkonLogo from '../common/EventkonLogo';
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  CogIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  UsersIcon,
  BellIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navigation = [
    { name: 'Trang chủ', href: '/', icon: HomeIcon },
    { name: 'Sự kiện', href: '/events', icon: UserGroupIcon },
    { name: 'Lịch', href: '/calendar', icon: CalendarIcon },
    { name: 'AI Assistant', href: '/assistant', icon: ChatBubbleLeftRightIcon },
  ];

  const studentNavigation = [
    { name: 'Hồ sơ', href: '/profile', icon: UserIcon },
  ];

  const hostNavigation = [
    { name: 'Quản lý sự kiện', href: '/manage-events', icon: ClipboardDocumentListIcon },
    { name: 'Thống kê', href: '/statistics', icon: ChartBarIcon },
  ];

  const adminNavigation = [
    { name: 'Phê duyệt sự kiện', href: '/approve-events', icon: ClipboardDocumentListIcon },
    { name: 'Quản lý người dùng', href: '/manage-users', icon: UsersIcon },
    { name: 'Cấu hình hệ thống', href: '/system-config', icon: CogIcon },
  ];

  const isActive = (href) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-50 lg:bg-black lg:border-r lg:border-black">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-black">
        <EventkonLogo className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Main Navigation */}
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
              Chính
            </h3>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-primary text-white border-r-2 border-primary'
                    : 'text-white hover:bg-primary hover:text-white'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Student Navigation */}
          {currentUser && currentUser.role === 'student' && (
            <div className="space-y-1 pt-4">
              <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
                Cá nhân
              </h3>
              {studentNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-white border-r-2 border-primary'
                      : 'text-white hover:bg-primary hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Host Navigation */}
          {currentUser && currentUser.role === 'host' && (
            <div className="space-y-1 pt-4">
              <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
                Quản lý
              </h3>
              {hostNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-white border-r-2 border-primary'
                      : 'text-white hover:bg-primary hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          {/* Admin Navigation */}
          {currentUser && currentUser.role === 'admin' && (
            <div className="space-y-1 pt-4">
              <h3 className="px-3 text-xs font-semibold text-white uppercase tracking-wider">
                Quản trị
              </h3>
              {adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-primary text-white border-r-2 border-primary'
                      : 'text-white hover:bg-primary hover:text-white'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* User Profile */}
        {currentUser && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.fullName}
                className="h-10 w-10 rounded-full border-2 border-gray-200"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {currentUser.role === 'student' ? 'Sinh viên' :
                   currentUser.role === 'host' ? 'CLB/Host' : 'Admin'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 space-y-1">
              <Link
                to="/profile"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                <UserIcon className="mr-3 h-4 w-4" />
                Hồ sơ
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;