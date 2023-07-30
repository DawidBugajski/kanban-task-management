/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: '#635FC7',
        'purple-hover': '#A8A4FF',
        black: '#000112',
        'darkbg-very-dark-grey': '#20212C',
        'dark-grey': '#2B2C37',
        'dark-lines': '#3E3F4E',
        'medium-grey': '#828FA3',
        'light-lines': '#E4EBFA',
        'lightbg-light-grey': '#F4F7FD',
        white: '#FFF',
        red: '#EA5555',
        'red-hover': '#FF9898',
        'lightbg-hover-boards': '#f0effa',
        'bg-modal': 'rgba(0,0,0,0.5)',
      },
      fontSize: {
        'heading-xl': ['24px', '30px'],
        'heading-l': ['18px', '23px'],
        'heading-m': ['15px', '19px'],
        'heading-s': ['12px', '15px'],
        'body-l': ['13px', '23px'],
        'body-m': ['12px', '15px'],
      },
      fontWeight: {
        heading: 700,
        'body-l': 500,
        'body-m': 700,
      },
      letterSpacing: {
        'heading-s': '2.4px',
      },
    },
  },
  plugins: [],
};
