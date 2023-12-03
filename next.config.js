// next.config.js
module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.txt$/,
        use: 'raw-loader',
      });
  
      return config;
    },
  };
  