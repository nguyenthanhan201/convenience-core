const plugin = require('./plugin/index.cjs');
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,js,tsx}'],
  plugins: [plugin],
};
