
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import provinces from '@/lib/provinces.json';
import ProfileDropdown from './ProfileDropdown';

const AuthButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [province, setProvince] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const remembered = localStorage.getItem('isLoggedIn');
    const sessionActive = sessionStorage.getItem('isLoggedIn');
    if (remembered === 'true' || sessionActive === 'true') {
      setSession(true);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOpenModal = (login: boolean) => {
    setIsLogin(login);
    setShowModal(true);
    setError(null);
    setIsForgotPassword(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setProvince('');
    setError(null);
    setIsLoading(false);
    setIsForgotPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (isForgotPassword) {
      // Handle forgot password logic
      console.log('Forgot password for:', email);
      // Here you would typically call an API endpoint to send a password reset email
      setIsLoading(false);
      handleCloseModal();
      return;
    }

    if (!isLogin && (!name || !email || !password || !confirmPassword || !province)) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    if (isLogin && (!email || !password)) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    const url = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin ? { email, password } : { name, email, password, confirmPassword, province };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Success:', data);
      setSession(true);
      if (rememberMe) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        sessionStorage.setItem('isLoggedIn', 'true');
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setSession(false);
    setShowDropdown(false);
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
  };

  const getModalTitle = () => {
    if (isForgotPassword) return 'ลืมรหัสผ่าน';
    return isLogin ? 'ยินดีต้อนรับกลับ' : 'สร้างบัญชีใหม่';
  };

  return (
    <>
      {session ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Open user menu"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden border border-blue-200 dark:border-blue-700">
              <Image src="/user.svg" alt="User Profile" width={20} height={20} className="opacity-80" />
            </div>
          </button>
          {showDropdown && <ProfileDropdown onLogout={handleLogout} />}
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleOpenModal(false)}
            className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
          >
            สมัครสมาชิก
          </button>
          <button
            onClick={() => handleOpenModal(true)}
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 transition-all"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      )}

      {showModal && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          aria-hidden="true"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={handleCloseModal}
        >
          <div className="relative p-4 w-full max-w-md max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-800 overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getModalTitle()}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white transition-colors"
                  onClick={handleCloseModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {error && (
                  <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-xl bg-red-50 dark:bg-red-900/30 dark:text-red-300 border border-red-100 dark:border-red-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>{error}</div>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {isForgotPassword ? (
                    <>
                      <div>
                        <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">อีเมลของคุณ</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                          </div>
                          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" placeholder="name@company.com" required />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        เราจะส่งลิงก์เพื่อรีเซ็ตรหัสผ่านไปยังอีเมลของคุณ
                      </p>
                    </>
                  ) : (
                    <>
                      {!isLogin && (
                        <div>
                          <label htmlFor="name" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">ชื่อของคุณ</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                              </svg>
                            </div>
                            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" placeholder="สมชาย ใจดี" required />
                          </div>
                        </div>
                      )}

                      <div>
                        <label htmlFor="email" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">อีเมล</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                            </svg>
                          </div>
                          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" placeholder="name@company.com" required />
                        </div>
                      </div>

                      {!isLogin && (
                        <>
                          <div>
                            <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                  <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z" />
                                </svg>
                              </div>
                              <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" required />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="confirmPassword" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">ยืนยันรหัสผ่าน</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                  <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z" />
                                </svg>
                              </div>
                              <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" required />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="province" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">จังหวัด</label>
                            <select id="province" value={province} onChange={(e) => setProvince(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" required>
                              <option value="">-- กรุณาเลือกจังหวัด --</option>
                              {provinces.map((p) => (
                                <option key={p.id} value={p.name_th}>{p.name_th}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}

                      {isLogin && (
                        <div>
                          <label htmlFor="password" className="block mb-1.5 text-sm font-medium text-gray-900 dark:text-white">รหัสผ่าน</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                                <path d="M14 7h-1.5V4.5a4.5 4.5 0 1 0-9 0V7H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Zm-5 8a1 1 0 1 1-2 0v-3a1 1 0 1 1 2 0v3Z" />
                              </svg>
                            </div>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white transition-colors" required />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input id="remember-me" type="checkbox" value="" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                          <label htmlFor="remember-me" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">จดจำฉัน</label>
                        </div>
                        {isLogin && (
                          <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={() => setIsForgotPassword(true)}>
                            ลืมรหัสผ่าน?
                          </a>
                        )}
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        กำลังดำเนินการ...
                      </>
                    ) : (
                      isForgotPassword ? 'ส่งลิงก์รีเซ็ต' : (isLogin ? 'เข้าสู่ระบบ' : 'สร้างบัญชี')
                    )}
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                    {isForgotPassword ? (
                      <a href="#" className="text-blue-700 hover:underline dark:text-blue-500 font-bold" onClick={() => setIsForgotPassword(false)}>
                        กลับไปหน้าเข้าสู่ระบบ
                      </a>
                    ) : (
                      <>
                        {isLogin ? 'ยังไม่มีบัญชี?' : 'มีบัญชีอยู่แล้ว?'}{' '}
                        <a href="#" className="text-blue-700 hover:underline dark:text-blue-500 font-bold" onClick={() => setIsLogin(!isLogin)}>
                          {isLogin ? 'สร้างบัญชีใหม่' : 'เข้าสู่ระบบ'}
                        </a>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButtons;
