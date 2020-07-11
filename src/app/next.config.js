const withPWA = require('next-pwa');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { NODE_ENV, ANALYSE, CONFIG_ENV } = process.env;

const nextConfig = {

  // Options for next-pwa (see https://github.com/shadowwalker/next-pwa#configuration)
  pwa: {
    disable: NODE_ENV !== 'production',
    register: true,
    dest: '.next',
    sw: 'sw.js',
    // https://developers.google.com/web/tools/workbox/modules/workbox-strategies
    runtimeCaching: [
      {
        handler: "NetworkFirst",
        urlPattern: /^https?.*/
      },
      {
        handler: "NetworkFirst",
        urlPattern: /\/_next\/.*/
      }
    ]
  },

  // buildId, dev, isServer, defaultLoaders, webpack
  webpack: (config, { dev }) => {
    if (ANALYSE) {
      // https://www.npmjs.com/package/webpack-bundle-analyzer
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    config.plugins.push(
      // Define global constants which are configured at compile time
      // https://webpack.js.org/plugins/define-plugin/
      new webpack.DefinePlugin({
        __CONFIG__: JSON.stringify(CONFIG_ENV)
      })
    );
    return config;
  }
}

module.exports = withPWA(nextConfig);