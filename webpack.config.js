var path = require('path');

module.exports = {
  entry: './lib/escape_the_core.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '*'],
  },
};
