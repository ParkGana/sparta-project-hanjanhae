'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BottomNavBar: React.FC = () => {
  const pathname = usePathname();

  if (
    ['/signup', '/signin', '/preferences/result'].includes(pathname) ||
    pathname.startsWith('/drink') ||
    pathname.startsWith('/place') ||
    pathname.startsWith('/password')
  ) {
    return null;
  }

  const navItems = [
    {
      name: '홈',
      href: '/',
      icon: '/assets/icons/home.svg',
      activeIcon: '/assets/icons/home_pressed.svg',
      activeColor: 'text-primary',
    },
    {
      name: '검색',
      href: '/search',
      icon: '/assets/icons/search.svg',
      activeIcon: '/assets/icons/search_pressed.svg',
      activeColor: 'text-primary',
    },
    {
      name: '좋아요',
      href: '/like',
      icon: '/assets/icons/heart.svg',
      activeIcon: '/assets/icons/heart_pressed.svg',
      activeColor: 'text-primary',
    },
    {
      name: '마이페이지',
      href: '/mypage',
      icon: '/assets/icons/user.svg',
      activeIcon: '/assets/icons/user_pressed.svg',
      activeColor: 'text-primary',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-grayscale-200 bg-etc-white shadow-md">
      <ul className="flex items-center justify-between py-2">
        {navItems.map((item) => (
          <li
            key={item.href}
            className="flex flex-1 flex-col items-center text-center"
          >
            <Link
              href={item.href}
              className={`flex flex-col items-center text-sm ${
                pathname === item.href ? item.activeColor : 'text-gray-500'
              }`}
            >
              <Image
                src={pathname === item.href ? item.activeIcon : item.icon}
                alt={item.name}
                width={24}
                height={24}
                className="transition-all"
              />
              <span
                className={`mt-1 text-label-sm ${
                  pathname === item.href ? item.activeColor : ''
                }`}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
