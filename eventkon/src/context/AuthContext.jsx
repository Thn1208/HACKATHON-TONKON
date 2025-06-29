import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data cho 3 tài khoản mẫu FPTU với sở thích và lịch học
  const mockUsers = [
    {
      id: 1,
      email: 'student@fptu.edu.vn',
      password: '123456',
      fullName: 'Nguyễn Văn A',
      studentId: 'SE160123',
      major: 'Kỹ thuật phần mềm',
      year: '2023',
      role: 'student',
      phone: '0123456789',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      interests: ['Công nghệ', 'AI', 'Machine Learning', 'Lập trình Web', 'Mobile Development'],
      schedule: [
        {
          id: 'class1',
          title: 'Lập trình Web - SE1601',
          day: 'monday',
          startTime: '08:00',
          endTime: '11:00',
          location: 'Phòng 301, FPTU',
          instructor: 'TS. Nguyễn Văn B',
          type: 'class'
        },
        {
          id: 'class2',
          title: 'Cơ sở dữ liệu - SE1601',
          day: 'tuesday',
          startTime: '13:00',
          endTime: '16:00',
          location: 'Phòng 302, FPTU',
          instructor: 'ThS. Trần Thị C',
          type: 'class'
        },
        {
          id: 'class3',
          title: 'Toán rời rạc - SE1601',
          day: 'wednesday',
          startTime: '08:00',
          endTime: '11:00',
          location: 'Phòng 303, FPTU',
          instructor: 'TS. Lê Văn D',
          type: 'class'
        },
        {
          id: 'class4',
          title: 'Lập trình Web - SE1601',
          day: 'thursday',
          startTime: '13:00',
          endTime: '16:00',
          location: 'Phòng 301, FPTU',
          instructor: 'TS. Nguyễn Văn B',
          type: 'class'
        },
        {
          id: 'class5',
          title: 'Cơ sở dữ liệu - SE1601',
          day: 'friday',
          startTime: '08:00',
          endTime: '11:00',
          location: 'Phòng 302, FPTU',
          instructor: 'ThS. Trần Thị C',
          type: 'class'
        }
      ],
      eventHistory: [
        {
          id: 1,
          eventId: 1,
          title: 'Hội thảo AI 2023',
          date: '2023-12-15',
          status: 'completed',
          rating: 5
        },
        {
          id: 2,
          eventId: 3,
          title: 'Workshop React Native',
          date: '2023-11-20',
          status: 'completed',
          rating: 4
        },
        {
          id: 3,
          eventId: 5,
          title: 'Hackathon 2023',
          date: '2023-10-25',
          status: 'completed',
          rating: 5
        }
      ]
    },
    {
      id: 2,
      email: 'club@fptu.edu.vn',
      password: '123456',
      fullName: 'CLB Công nghệ FPTU',
      role: 'host',
      organization: 'CLB Công nghệ thông tin',
      phone: '0987654321',
      avatar: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100',
      interests: ['Công nghệ', 'AI', 'Blockchain', 'Mobile Development'],
      schedule: [],
      eventHistory: []
    },
    {
      id: 3,
      email: 'admin@fptu.edu.vn',
      password: '123456',
      fullName: 'Admin FPTU',
      role: 'admin',
      phone: '0111222333',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      interests: ['Quản lý', 'Hệ thống', 'Bảo mật'],
      schedule: [],
      eventHistory: []
    }
  ];

  useEffect(() => {
    // Kiểm tra localStorage khi component mount
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login logic
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    } else {
      return { success: false, error: 'Email hoặc mật khẩu không đúng' };
    }
  };

  const register = async (userData) => {
    // Mock registration logic
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      schedule: [],
      eventHistory: []
    };
    
    // Thêm user mới vào mock data
    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUser = (updatedData) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updatedData };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Update in mock users array
      const userIndex = mockUsers.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
      }
    }
  };

  const addScheduleItem = (scheduleItem) => {
    if (currentUser) {
      const updatedSchedule = [...(currentUser.schedule || []), scheduleItem];
      updateUser({ schedule: updatedSchedule });
    }
  };

  const removeScheduleItem = (scheduleId) => {
    if (currentUser) {
      const updatedSchedule = (currentUser.schedule || []).filter(item => item.id !== scheduleId);
      updateUser({ schedule: updatedSchedule });
    }
  };

  const addEventToHistory = (event) => {
    if (currentUser) {
      const newEventHistory = {
        id: Date.now(),
        eventId: event.id,
        title: event.title,
        date: event.date,
        status: 'completed',
        rating: 0
      };
      const updatedHistory = [...(currentUser.eventHistory || []), newEventHistory];
      updateUser({ eventHistory: updatedHistory });
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    addScheduleItem,
    removeScheduleItem,
    addEventToHistory,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 