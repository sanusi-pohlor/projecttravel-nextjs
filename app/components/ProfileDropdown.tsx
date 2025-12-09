
'use client';

import Link from 'next/link';

type ProfileDropdownProps = {
  onLogout: () => void;
};

const ProfileDropdown = ({ onLogout }: ProfileDropdownProps) => {
  return (
    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl z-50 border border-gray-100 dark:border-gray-700 overflow-hidden transform origin-top-right transition-all">
      <div className="py-1">
        <Link href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
          <div className="mr-3 p-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 9 13h2a3.987 3.987 0 0 0 3.951 3.512 8.949 8.949 0 0 0 4.951-1.488V17a2 2 0 0 0-2 2h-2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
          <span className="font-medium">จัดการโปรไฟล์</span>
        </Link>
        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
        <button
          onClick={onLogout}
          className="flex w-full items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group text-left"
        >
          <div className="mr-3 p-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/40 transition-colors">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
            </svg>
          </div>
          <span className="font-medium">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
