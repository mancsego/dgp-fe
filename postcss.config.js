/* eslint-disable */
const minimize = process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...minimize
  }
}
