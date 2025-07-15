
'use client';

import Link from 'next/link';

type ProfileDropdownProps = {
  onLogout: () => void;
};

const ProfileDropdown = ({ onLogout }: ProfileDropdownProps) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
      <div className="py-1">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          จัดการโปรไฟล์
        </Link>
        <button
          onClick={onLogout}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
