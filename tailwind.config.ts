import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      zIndex: {
        '1000': '1000'
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px'
      },
      colors: {
        'primary-green-50': '#f7fdfa',
        'primary-green-100': '#d1f0df',
        'primary-green-200': '#aae4c4',
        'primary-green-300': '#83d7a9',
        'primary-green-400': '#5dcb8e',
        'primary-green-500': '#3BB873',
        'primary-green-600': '#2f935c',
        'primary-green-700': '#236c44',
        'primary-green-800': '#236c44',
        'secondary-yellow-50': '#fefefa',
        'secondary-yellow-100': '#F9F3CF',
        'secondary-yellow-200': '#f3e7a0',
        'secondary-yellow-300': '#eddc72',
        'secondary-yellow-400': '#e8d145',
        'secondary-yellow-500': '#dec21c',
        'secondary-yellow-600': '#b19b16',
        'font-black-main': '#111111',
        'grayscale-gray-50': '#f7f7f7',
        'grayscale-gray-100': '#dedede',
        'grayscale-gray-200': '#c4c4c4',
        'grayscale-gray-300': '#ababab',
        'grayscale-gray-400': '#919191',
        'grayscale-gray-500': '#787878',
        'grayscale-gray-600': '#5e5e5e',
        'grayscale-gray-700': '#454545',
        'font/main': '#111111',
        'font/sub1': '#555555',
        'font/sub2': '#767676',
        'font/Disabled': '#999999',
        'Line/Light': '#f1f1f5',
        'Line/Regular': '#e5e5ec',
        'Line/Strong': '#111111',
        'Line/Disabled': '#cacad7',
        'BG/Light': '#F7F7FB',
        'BG/Regular': '#F1F1F5'
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)']
      }
    }
  },
  plugins: [require('tailwind-scrollbar')]
};

export default config;
