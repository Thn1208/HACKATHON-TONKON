import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      
      {/* Main content with sidebar offset */}
      <div className="lg:pl-64">
        <main className="pt-16">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;