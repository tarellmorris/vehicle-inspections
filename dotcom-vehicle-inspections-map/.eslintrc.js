/* eslint-env node */
const createConfig = require('@uber/eslint-config');

module.exports = createConfig(
  {
    ignorePatterns: ['**/*.flow.js'],
  },
  {
    typescript: true,
  }
);
