import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { 
  UserIcon, 
  BellIcon, 
  ClockIcon, 
  CogIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: currentUser?.fullName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    studentId: currentUser?.studentId || '',
    major: currentUser?.major || ''
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser.phone,
      studentId: currentUser.studentId,
      major: currentUser.major
    });
    setIsEditing(false);
  };

  const tabs = [
    { id: 'personal', name: 'Thông tin cá nhân', icon: UserIcon },
    { id: 'history', name: 'Lịch sử sự kiện', icon: ClockIcon },
    { id: 'notifications', name: 'Thông báo', icon: BellIcon },
    { id: 'settings', name: 'Cài đặt', icon: CogIcon }
  ];

  const eventHistory = [
    {
      id: 1,
      title: 'Hội thảo AI 2024',
      date: '2024-01-15',
      status: 'completed',
      location: 'Hội trường A, FPTU'
    },
    {
      id: 2,
      title: 'Workshop Kỹ năng Thuyết trình',
      date: '2024-01-20',
      status: 'upcoming',
      location: 'Phòng 301, FPTU'
    },
    {
      id: 3,
      title: 'Cuộc thi Hackathon 2024',
      date: '2024-01-25',
      status: 'registered',
      location: 'Thư viện trung tâm, FPTU'
    }
  ];

  const notifications = [
    {
      id: 1,
      title: 'Sự kiện mới',
      message: 'Hội thảo Blockchain đã được thêm vào lịch',
      time: '2 giờ trước',
      read: false
    },
    {
      id: 2,
      title: 'Nhắc nhở',
      message: 'Workshop Marketing Digital bắt đầu trong 1 giờ',
      time: '1 ngày trước',
      read: true
    },
    {
      id: 3,
      title: 'Cập nhật',
      message: 'Lịch học của bạn đã được cập nhật',
      time: '2 ngày trước',
      read: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'registered': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Đã tham gia';
      case 'upcoming': return 'Sắp diễn ra';
      case 'registered': return 'Đã đăng ký';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.fullName}
                  className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {currentUser.fullName}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentUser.role === 'student' ? 'bg-blue-100 text-blue-800' :
                    currentUser.role === 'host' ? 'bg-purple-100 text-purple-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentUser.role === 'student' ? 'Sinh viên' :
                     currentUser.role === 'host' ? 'CLB/Host' : 'Admin'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-2">
                  {currentUser.email} • {currentUser.phone}
                </p>
                
                {currentUser.studentId && (
                  <p className="text-gray-600">
                    MSSV: {currentUser.studentId} • {currentUser.major}
                  </p>
                )}
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="text-center">
                    {currentUser.eventHistory && currentUser.eventHistory.length > 0 && (
                      <>
                        <div className="text-2xl font-bold text-blue-600">{currentUser.eventHistory.length}</div>
                        <div className="text-sm text-gray-600">Sự kiện đã tham gia</div>
                      </>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {notifications.filter(n => !n.read).length}
                    </div>
                    <div className="text-sm text-gray-600">Thông báo mới</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Personal Info Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Thông tin cá nhân
                    </h3>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <PencilIcon className="w-4 h-4" />
                        <span>Chỉnh sửa</span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={handleSave}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span>Lưu</span>
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        >
                          <XMarkIcon className="w-4 h-4" />
                          <span>Hủy</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Họ và tên
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{currentUser.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{currentUser.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Số điện thoại
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900">{currentUser.phone}</p>
                      )}
                    </div>

                    {currentUser.studentId && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            MSSV
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.studentId}
                              onChange={(e) => setEditForm({...editForm, studentId: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{currentUser.studentId}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chuyên ngành
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.major}
                              onChange={(e) => setEditForm({...editForm, major: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-900">{currentUser.major}</p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Event History Tab */}
              {activeTab === 'history' && currentUser.eventHistory && currentUser.eventHistory.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Lịch sử tham gia sự kiện
                  </h3>
                  <div className="space-y-4">
                    {currentUser.eventHistory.map((event) => (
                      <div key={event.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.location}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
                            {getStatusText(event.status)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Thông báo
                  </h3>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full ml-4"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Cài đặt
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Thông báo</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-3 text-gray-700">Thông báo sự kiện mới</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-3 text-gray-700">Nhắc nhở sự kiện</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                          <span className="ml-3 text-gray-700">Cập nhật lịch học</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-4">Bảo mật</h4>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Đổi mật khẩu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;