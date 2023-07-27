const plugin = require('tailwindcss/plugin');

const base = require('./base.cjs');
const utilities = require('./utilities.cjs');

const accordion = require('./components/accordion.cjs');

const theme = require('./theme.cjs');

module.exports = plugin(
  ({ addComponents, addBase, addUtilities }) => {
    addBase({ ...base });
    addComponents({
      ...accordion,
    });
    addUtilities({ ...utilities });
  },
  { theme: { extend: { ...theme } } },
);
