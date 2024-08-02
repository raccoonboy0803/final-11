import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import Header from './(providers)/(root)/_components/Header';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard'
});

export const metadata: Metadata = {
  title: 'LeafyLink',
  description: 'LeafyLink'
};

function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <head>
        <script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
      </head>

      <Script src="https://cdn.iamport.kr/v1/iamport.js" />

      <body className={pretendard.className}>{children}</body>
    </html>
  );
}

export default RootLayout;
