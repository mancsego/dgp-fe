/** @type {import('tailwindcss').Config} */

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        rice: '#FCF8E8',
        sage: '#94B49F',
        pistachio: '#CEE5D0',
        shamrock: '#355941',
        ochre: '#bd6631'
      }
    }
  },
  plugins: []
}
