const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './app.js',
    mode: 'development',
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.ttf$/,
            use: [
              'url-loader',
            ],
          },
        ],
      },
      plugins: [
        new Dotenv({
            path: './.env', // Path to .env file (this is the default)
            safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
          })

      ],
      target: 'node'
  };