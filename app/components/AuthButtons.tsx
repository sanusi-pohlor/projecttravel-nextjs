
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import provinces from '@/lib/provinces.json';
import ProfileDropdown from './ProfileDropdown';

const AuthButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [province, setProvince] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setProvince('');
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin && (!name || !email || !password || !confirmPassword || !province)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isLogin && (!email || !password)) {
      setError('Please fill in all required fields.');
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
      // Here you might want to redirect the user or update the UI
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleLogout = () => {
    setSession(false);
    setShowDropdown(false);
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isLoggedIn');
  };

  return (
    <>
      {session ? (
        <div className="relative" ref={dropdownRef}>
          <button className="flex items-center space-x-2" onClick={() => setShowDropdown(!showDropdown)} aria-label="Open user menu">
            <Image src="/user.svg" alt="User Profile" width={32} height={32} />
          </button>
          {showDropdown && <ProfileDropdown onLogout={handleLogout} />}
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleOpenModal(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            สมัครสมาชิก
          </button>
          <button
            onClick={() => handleOpenModal(true)}
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={handleCloseModal}
        >
          <div className="relative p-4 w-full max-w-md max-h-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isLogin ? 'Sign in to our platform' : 'Create an account'}
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={handleCloseModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5">
                {error && (
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {error}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required />
                      </div>
                    </>
                  )}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                  </div>
                  {!isLogin && (
                    <>
                      <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                      </div>
                      <div>
                        <label htmlFor="province" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                        <select id="province" value={province} onChange={(e) => setProvince(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required>
                          <option value="">-- Please select a province --</option>
                          {provinces.map((p) => (
                            <option key={p.id} value={p.name_th}>{p.name_th}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  <div className="flex items-center">
                    <input id="remember-me" type="checkbox" value="" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                    <label htmlFor="remember-me" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLogin ? 'Login to your account' : 'Create account'}
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {isLogin ? 'Not registered?' : 'Already have an account?'} <a href="#" className="text-blue-700 hover:underline dark:text-blue-500" onClick={() => setIsLogin(!isLogin)}>
                      {isLogin ? 'Create account' : 'Log in'}
                    </a>
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
