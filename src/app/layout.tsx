import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

import BottomNavBar from '@/components/common/BottomNavBar';
import ScrollTop from '@/components/common/ScrollTop';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Providers from '@/providers/Provider';

import '@/styles/globals.css';
import KakaoInit from './drink/_components/KakaoInit';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://developers.kakao.com/sdk/js/kakao.min.js"
          strategy="lazyOnload"
        />
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <Header />
          <KakaoInit />
          {children}
          <ScrollTop />
          <BottomNavBar />
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
