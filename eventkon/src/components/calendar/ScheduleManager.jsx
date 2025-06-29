import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PlusIcon, XMarkIcon, PencilIcon } from '@heroicons/react/24/outline';

const ScheduleManager = ({ isOpen, onClose }) => {
  const { currentUser, addScheduleItem, removeScheduleItem, updateUser } = useAuth();
  const [newClass, setNewClass] = useState({
    title: '',
    day: 'monday',
    startTime: '08:00',
    endTime: '11:00',
    location: '',
    instructor: '',
    type: 'class'
  });

  const days = [
    { value: 'monday', label: 'Thứ 2' },
    { value: 'tuesday', label: 'Thứ 3' },
    { value: 'wednesday', label: 'Thứ 4' },
    { value: 'thursday', label: 'Thứ 5' },
    { value: 'friday', label: 'Thứ 6' },
    { value: 'saturday', label: 'Thứ 7' },
    { value: 'sunday', label: 'Chủ nhật' }
  ];

  const timeSlots = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ];

  const handleAddClass = () => {
    if (newClass.title && newClass.location && newClass.instructor) {
      const classItem = {
        ...newClass,
        id: `class_${Date.now()}`
      };
      addScheduleItem(classItem);
      setNewClass({
        title: '',
        day: 'monday',
        startTime: '08:00',
        endTime: '11:00',
        location: '',
        instructor: '',
        type: 'class'
      });
    }
  };

  const handleRemoveClass = (classId) => {
    removeScheduleItem(classId);
  };

  const getDayLabel = (dayValue) => {
    return days.find(d => d.value === dayValue)?.label || dayValue;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Quản lý lịch học
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Add New Class Form */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Thêm lớp học mới
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên lớp học *
                </label>
                <input
                  type="text"
                  value={newClass.title}
                  onChange={(e) => setNewClass({...newClass, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Lập trình Web - SE1601"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thứ *
                </label>
                <select
                  value={newClass.day}
                  onChange={(e) => setNewClass({...newClass, day: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {days.map(day => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ bắt đầu *
                </label>
                <select
                  value={newClass.startTime}
                  onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ kết thúc *
                </label>
                <select
                  value={newClass.endTime}
                  onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phòng học *
                </label>
                <input
                  type="text"
                  value={newClass.location}
                  onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: Phòng 301, FPTU"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giảng viên *
                </label>
                <input
                  type="text"
                  value={newClass.instructor}
                  onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="VD: TS. Nguyễn Văn A"
                />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={handleAddClass}
                disabled={!newClass.title || !newClass.location || !newClass.instructor}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Thêm lớp học</span>
              </button>
            </div>
          </div>

          {/* Current Schedule */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Lịch học hiện tại
            </h3>
            {currentUser?.schedule && currentUser.schedule.length > 0 ? (
              <div className="space-y-3">
                {days.map(day => {
                  const dayClasses = currentUser.schedule.filter(cls => cls.day === day.value);
                  if (dayClasses.length === 0) return null;

                  return (
                    <div key={day.value} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <h4 className="font-medium text-gray-900">{day.label}</h4>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {dayClasses.map(cls => (
                          <div key={cls.id} className="p-4 flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                  <h5 className="font-medium text-gray-900">{cls.title}</h5>
                                  <p className="text-sm text-gray-600">
                                    {cls.startTime} - {cls.endTime} • {cls.location}
                                  </p>
                                  <p className="text-sm text-gray-500">{cls.instructor}</p>
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveClass(cls.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <XMarkIcon className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Chưa có lịch học nào được thêm</p>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManager; 