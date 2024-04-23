/** @type {import('tailwindcss').Config} */
import ColorsTaiwind from 'tailwindcss/colors'
import Colors from './Colors'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: { ...ColorsTaiwind, ...Colors },
    extend: {
      colors: { ...Colors }
    }
  },
  plugins: []
}
