import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      screens: {
        md: '768px', // 중간 화면 (예: 태블릿)
        lg: '1024px', // 큰 화면 (예: 노트북)
        xl: '1280px', // 초대형 화면 (예: 데스크탑)
      },
      colors: {
        // Primary Colors
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover-color)',
        'primary-100': 'var(--primary-100)',
        'primary-200': 'var(--primary-200)',
        'primary-300': 'var(--primary-300)',

        // Secondary Colors
        secondary: 'var(--secondary-color)',
        'secondary-hover': 'var(--secondary-hover-color)',
        'secondary-50': 'var(--secondary-50)',
        'secondary-100': 'var(--secondary-100)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-250': 'var(--secondary-250)',
        'secondary-300': 'var(--secondary-300)',

        // Grayscale
        'grayscale-900': 'var(--gray-900)',
        'grayscale-800': 'var(--gray-800)',
        'grayscale-700': 'var(--gray-700)',
        'grayscale-600': 'var(--gray-600)',
        'grayscale-500': 'var(--gray-500)',
        'grayscale-400': 'var(--gray-400)',
        'grayscale-300': 'var(--gray-300)',
        'grayscale-200': 'var(--gray-200)',
        'grayscale-150': 'var(--gray-150)',
        'grayscale-100': 'var(--gray-100)',

        // Additional Colors
        'etc-white': 'var(--white)',
        'etc-red': 'var(--red)',
        'etc-cream': 'var(--cream)',
        'etc-blue': 'var(--blue)',
        'etc-yellow': 'var(--yellow)',
      },
      fontSize: {
        // Title
        'title-2xl': ['40px', { lineHeight: '135%', fontWeight: '700' }],
        'title-xl': ['24px', { lineHeight: '135%', fontWeight: '700' }],
        'title-lb': ['20px', { lineHeight: '135%', fontWeight: '700' }],
        'title-lm': ['20px', { lineHeight: '135%', fontWeight: '500' }],
        'title-mb': ['16px', { lineHeight: '135%', fontWeight: '700' }],
        'title-mm': ['16px', { lineHeight: '135%', fontWeight: '500' }],
        'title-sb': ['12px', { lineHeight: '135%', fontWeight: '700' }],

        // Body
        'body-lm': ['24px', { lineHeight: '150%', fontWeight: '500' }],
        'body-mm': ['16px', { lineHeight: '150%', fontWeight: '500' }],
        'body-sm': ['12px', { lineHeight: '150%', fontWeight: '500' }],

        // Label
        'label-xlm': ['20px', { lineHeight: '150%', fontWeight: '500' }],
        'label-lm': ['16px', { lineHeight: '150%', fontWeight: '500' }],
        'label-mb': ['12px', { lineHeight: '150%', fontWeight: '700' }],
        'label-mm': ['12px', { lineHeight: '150%', fontWeight: '500' }],
        'label-sb': ['10px', { lineHeight: '150%', fontWeight: '700' }],
        'label-sm': ['10px', { lineHeight: '150%', fontWeight: '500' }],

        // Caption
        'caption-lm': ['16px', { lineHeight: '150%', fontWeight: '500' }],
        'caption-mm': ['12px', { lineHeight: '150%', fontWeight: '500' }],
        'caption-sm': ['10px', { lineHeight: '150%', fontWeight: '500' }],
      },
      fontWeight: {
        bold: '700',
        medium: '500',
      },
      boxShadow: {
        'main-banner': '0px 5px 15px 0px rgba(249, 159, 175, 0.40)',
        search: '0px 2px 8px 0px rgba(99, 99, 99, 0.20)',
        select: '0px 0px 3px 0px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-banner':
          'linear-gradient(90deg, var(--primary-100) 0%, var(--secondary-300) 100%)',
        'gradient-main-banner':
          'linear-gradient(124deg, var(--primary-color) 29.95%, var(--secondary-250) 119.58%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
