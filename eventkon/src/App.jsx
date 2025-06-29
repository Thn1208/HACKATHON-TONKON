import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import CalendarPage from './pages/CalendarPage';
import EventManagementPage from './pages/EventManagementPage';
import EventStatisticsPage from './pages/EventStatisticsPage';
import EventApprovalPage from './pages/EventApprovalPage';
import UserManagementPage from './pages/UserManagementPage';
import SystemConfigurationPage from './pages/SystemConfigurationPage';
import ProfilePage from './pages/ProfilePage';
import AssistantPage from './pages/assistant';
import EventDetailPage from './pages/EventDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          
          {/* Protected Routes - Student */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Protected Routes - Host/CLB */}
          <Route path="/manage-events" element={<EventManagementPage />} />
          <Route path="/statistics" element={<EventStatisticsPage />} />
          
          {/* Protected Routes - Admin */}
          <Route path="/approve-events" element={<EventApprovalPage />} />
          <Route path="/manage-users" element={<UserManagementPage />} />
          <Route path="/system-config" element={<SystemConfigurationPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;