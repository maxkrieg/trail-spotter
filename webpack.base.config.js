var webpack = require('webpack');

module.exports = {
  target: 'web',

  resolve: {
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client',
    ],
    extensions: ['', '.js', '.jsx', '.css'],
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/ },
    ],

    loaders: [
      {
        test: /\.svg$/,
        loaders: ['babel', 'react-svg'],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader',
      },
    ],

    noParse: /\.min\.js/,
  },

};
