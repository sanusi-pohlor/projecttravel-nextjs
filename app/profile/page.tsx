
'use client';

import { useState } from 'react';
import ProfileForm from '@/app/components/ProfileForm';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />;
      case 'settings':
        return <div className="p-4">Settings Content (Coming Soon)</div>;
      case 'change-password':
        return <div className="p-4">Change Password Content (Coming Soon)</div>;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Profile Navigation</h2>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 ${activeTab === 'profile' ? 'bg-gray-200 font-medium' : ''}`}
          >
            จัดการโปรไฟล์
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 ${activeTab === 'settings' ? 'bg-gray-200 font-medium' : ''}`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('change-password')}
            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 ${activeTab === 'change-password' ? 'bg-gray-200 font-medium' : ''}`}
          >
            Change Password
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">{activeTab === 'profile' ? 'จัดการโปรไฟล์' : activeTab === 'settings' ? 'Settings' : 'Change Password'}</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePage;
