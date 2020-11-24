/* eslint-disable object-curly-newline */
const aliases = require('./alias-config');

module.exports = {
  env: {
    URL_SERVER: process.env.URL_SERVER,
  },
  webpack: (config) => {
    // config.resolve.alias['src'] = path.resolve(__dirname, 'src/');
    const { alias } = config.resolve;
    config.resolve.alias = {
      ...alias,
      ...aliases,
    };

    return config;
  },
};
