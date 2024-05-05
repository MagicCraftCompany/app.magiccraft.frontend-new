/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import { fontFamily } from 'tailwindcss/defaultTheme'

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/img/hero-new.webp')",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      borderRadius: {
        '4xl': '30px',
      },
      colors: {
        primary: {
          100: '#7B92FF',
          200: '#3F3F7A',
          300: '#171741',
          400: '#11113A',
          500: '#03082F',
          600: '#0A0917',
        },
        secondary: {
          100: '#98FFF9',
          200: '#83FFF8',
        },
        tertiary: {
          100: '#C09AFF',
          200: '#9255E0',
          300: '#431269',
          400: '#BE6AE14A',
          500: '#57186D',
          600: '#2A0D4E',
        },
      },
      fontFamily: {
        sans: ['Futura PT', ...fontFamily.sans],
        serif: ['Colus', ...fontFamily.serif],
        inter: ['Inter', ...fontFamily.serif],
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
