import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon, 
  UserGroupIcon,
  ArrowLeftIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock event data
    const mockEvent = {
      id: parseInt(id),
      title: 'Hội thảo Công nghệ AI 2024',
      description: 'Hội thảo về các xu hướng mới nhất trong trí tuệ nhân tạo, machine learning và deep learning. Sự kiện sẽ có sự tham gia của các chuyên gia hàng đầu trong lĩnh vực AI từ các công ty công nghệ lớn.',
      date: '2024-01-15',
      time: '14:00 - 17:00',
      location: 'Hội trường A, FPTU',
      category: 'Công nghệ',
      organizer: 'CLB Công nghệ FPTU',
      organizerEmail: 'club@fptu.edu.vn',
      organizerPhone: '0987654321',
      maxCapacity: 200,
      registeredCount: 150,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800',
      tags: ['AI', 'Machine Learning', 'Deep Learning', 'Công nghệ'],
      agenda: [
        '14:00 - 14:30: Khai mạc và giới thiệu',
        '14:30 - 15:30: Xu hướng AI trong 2024',
        '15:30 - 16:00: Coffee break',
        '16:00 - 17:00: Panel discussion và Q&A'
      ],
      requirements: [
        'Sinh viên FPTU',
        'Kiến thức cơ bản về lập trình',
        'Đăng ký trước 2 ngày'
      ],
      benefits: [
        'Chứng chỉ tham gia',
        'Network với chuyên gia',
        'Cơ hội thực tập',
        'Tài liệu và slide'
      ]
    };

    setEvent(mockEvent);
    setIsLoading(false);
  }, [id]);

  const handleRegister = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setIsRegistered(true);
    // Simulate registration
    setTimeout(() => {
      alert('Đăng ký thành công! Bạn sẽ nhận được email xác nhận.');
    }, 1000);
  };

  const handleCancelRegistration = () => {
    setIsRegistered(false);
    alert('Đã hủy đăng ký sự kiện.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sự kiện</h1>
            <Link to="/events" className="text-blue-600 hover:text-blue-700">
              Quay lại danh sách sự kiện
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const registrationProgress = (event.registeredCount / event.maxCapacity) * 100;
  const isPastEvent = new Date(event.date) < new Date();
  const isRegistrationDeadlinePassed = new Date(event.registrationDeadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Quay lại</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Image */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Event Details */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                        {event.category}
                      </span>
                      <span>Bởi {event.organizer}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      {new Date(event.date).toLocaleDateString('vi-VN', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ClockIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPinIcon className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Mô tả</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Chương trình</h3>
                  <ul className="space-y-2 mb-6">
                    {event.agenda.map((item, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Yêu cầu tham gia</h3>
                  <ul className="space-y-2 mb-6">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Lợi ích khi tham gia</h3>
                  <ul className="space-y-2">
                    {event.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Registration Card */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Đăng ký tham gia
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Đã đăng ký:</span>
                    <span className="font-semibold text-gray-900">
                      {event.registeredCount}/{event.maxCapacity}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${registrationProgress}%` }}
                    ></div>
                  </div>

                  <div className="text-sm text-gray-500">
                    {event.maxCapacity - event.registeredCount} chỗ còn lại
                  </div>
                </div>

                {isPastEvent || isRegistrationDeadlinePassed ? (
                  <button disabled className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed">Không thể đăng ký</button>
                ) : (
                  <button onClick={handleRegister} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Đăng ký</button>
                )}

                {isPastEvent && (
                  <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">Đã diễn ra</span>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Liên hệ tổ chức</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Email: {event.organizerEmail}</p>
                    <p>Điện thoại: {event.organizerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Similar Events */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sự kiện tương tự
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">Workshop Blockchain</h4>
                    <p className="text-sm text-gray-600">20/01/2024 • Phòng 301, FPTU</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-medium text-gray-900">Hackathon 2024</h4>
                    <p className="text-sm text-gray-600">25/01/2024 • Thư viện trung tâm, FPTU</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 