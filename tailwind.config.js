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
        "3xs": "10px",
        "22xl": "41px",
        "11xl": "30px",
        xl: "20px",
        lgi: "19px",
        "45xl-6": "64.6px",
        "47xl": "66px",
        "12xs": "1px",
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
        gray: {
          "100": "#03082f",
          "200": "#020418",
          "300": "rgba(13, 2, 27, 0.2)",
          "400": "rgba(0, 0, 0, 0.1)",
          "500": "rgba(12, 2, 24, 0.6)",
          "600": "rgba(8, 5, 24, 0.5)",
          "700": "rgba(0, 0, 0, 0.2)",
        },
        color: "rgba(67, 18, 105, 0.7)",
        fff9: "#98fff9",
        ffffff: "#fff",
        darkslategray: "#41476a",
        red: "rgba(255, 0, 0, 0.1)",
        mediumpurple: "#b591f2",
        c09aff: "#c19aff",
        midnightblue: {
          "100": "#11113a",
          "200": "rgba(61, 18, 105, 0.7)",
          "300": "rgba(67, 18, 105, 0.3)",
        },
        gainsboro: "rgba(217, 217, 217, 0)",
        slateblue: {
          "100": "rgba(68, 87, 184, 0.3)",
          "200": "rgba(68, 87, 184, 0.1)",
        },
        darkslateblue: "#202660",
        eff49: "#8eff49",
        lightslategray: "#8896ab",
      },
      fontFamily: {
        sans: ['Futura PT', ...fontFamily.sans],
        serif: ['Colus', ...fontFamily.serif],
        inter: ['Inter', ...fontFamily.serif],
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        16: 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
        'recently-listed': 'minmax(200px, 300px) 200px 150px',
        'recently-sold': 'minmax(200px, 300px) repeat(3,110px)',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    fontSize: {
      base: "1rem",
      "3xs-9": "0.619rem",
      lg: "1.125rem",
      sm: "0.875rem",
      "3xl": "1.375rem",
      "5xl": "1.5rem",
      inherit: "inherit",
    },
  },
  plugins: [require('tailwindcss-animate')],
}
